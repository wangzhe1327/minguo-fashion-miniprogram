const cloud = require('wx-server-sdk')
const http = require('http')
const https = require('https')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command
const COLLECTION = 'retouchOrders'

function requireAdmin(event) {
  const token = process.env.RETOUCH_ADMIN_TOKEN || ''
  if (!token || event.adminToken !== token) {
    throw new Error('UNAUTHORIZED')
  }
}

function getWorkerConfig(event) {
  const workerUrl = String(process.env.RETOUCH_WORKER_URL || event.workerUrl || '').replace(/\/$/, '')
  const workerToken = String(process.env.RETOUCH_WORKER_TOKEN || event.workerToken || '')

  if (!workerUrl) throw new Error('WORKER_URL_REQUIRED')
  return { workerUrl, workerToken }
}

async function getTempFileURLs(photos) {
  const fileIDs = Array.from(new Set((photos || []).map(photo => photo.fileID).filter(Boolean)))
  const urlMap = {}

  for (let i = 0; i < fileIDs.length; i += 20) {
    const batch = fileIDs.slice(i, i + 20)
    const res = await cloud.getTempFileURL({ fileList: batch })
    ;(res.fileList || []).forEach(item => {
      if (item.fileID && item.tempFileURL) {
        urlMap[item.fileID] = item.tempFileURL
      }
    })
  }

  return urlMap
}

async function callWorker(workerUrl, workerToken, payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload)
    const url = new URL(`${workerUrl}/process`)
    const client = url.protocol === 'https:' ? https : http
    const headers = {
      'content-type': 'application/json',
      'content-length': Buffer.byteLength(body)
    }
    if (workerToken) headers.authorization = `Bearer ${workerToken}`

    const req = client.request({
      protocol: url.protocol,
      hostname: url.hostname,
      port: url.port,
      path: `${url.pathname}${url.search}`,
      method: 'POST',
      headers,
      timeout: 120000
    }, res => {
      const chunks = []
      res.on('data', chunk => chunks.push(chunk))
      res.on('end', () => {
        const text = Buffer.concat(chunks).toString('utf8')
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`WORKER_FAILED_${res.statusCode}_${text.slice(0, 120)}`))
          return
        }

        try {
          resolve(JSON.parse(text))
        } catch (err) {
          reject(new Error(`WORKER_JSON_FAILED_${text.slice(0, 120)}`))
        }
      })
    })

    req.on('timeout', () => {
      req.destroy(new Error('WORKER_TIMEOUT'))
    })
    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

async function uploadResult(orderNo, result, index) {
  const buffer = Buffer.from(result.base64, 'base64')
  const safeId = String(result.id || `result_${index + 1}`).replace(/[^a-zA-Z0-9_-]/g, '_')
  const cloudPath = `retouch-results/${orderNo}/${safeId}.jpg`

  const res = await cloud.uploadFile({
    cloudPath,
    fileContent: buffer
  })

  return {
    id: safeId,
    name: result.name || `交付成片 ${index + 1}`,
    fileID: res.fileID,
    width: result.width || 0,
    height: result.height || 0,
    processingMs: result.processingMs || 0,
    usedModels: result.usedModels || []
  }
}

function appendLog(status, text) {
  return {
    status,
    text,
    createdAt: db.serverDate()
  }
}

exports.main = async event => {
  requireAdmin(event)
  const { workerUrl, workerToken } = getWorkerConfig(event)
  const orderId = String(event.orderId || '').trim()

  if (!orderId) {
    return { ok: false, error: 'ORDER_ID_REQUIRED' }
  }

  const orderRes = await db.collection(COLLECTION).doc(orderId).get()
  const order = orderRes.data
  if (!order) {
    return { ok: false, error: 'ORDER_NOT_FOUND' }
  }

  if (!['submitted', 'quoted', 'processing'].includes(order.status)) {
    return { ok: false, error: 'ORDER_NOT_PROCESSABLE' }
  }

  await db.collection(COLLECTION).doc(orderId).update({
    data: {
      status: 'processing',
      updatedAt: db.serverDate(),
      statusLogs: _.push(appendLog('processing', 'AI 后端开始处理订单'))
    }
  })

  try {
    const urlMap = await getTempFileURLs(order.photos || [])
    const payload = {
      orderId,
      orderNo: order.orderNo,
      packageId: order.packageId,
      effectId: order.effectId,
      deliveryId: order.deliveryId,
      intensity: order.intensity,
      photos: (order.photos || []).map(photo => ({
        ...photo,
        tempFileURL: photo.tempFileURL || urlMap[photo.fileID] || ''
      }))
    }

    const workerResult = await callWorker(workerUrl, workerToken, payload)
    if (!workerResult.ok || !Array.isArray(workerResult.results) || !workerResult.results.length) {
      throw new Error('WORKER_EMPTY_RESULT')
    }

    const resultPhotos = []
    for (let i = 0; i < workerResult.results.length; i += 1) {
      resultPhotos.push(await uploadResult(order.orderNo, workerResult.results[i], i))
    }

    await db.collection(COLLECTION).doc(orderId).update({
      data: {
        status: 'delivered',
        resultPhotos,
        updatedAt: db.serverDate(),
        statusLogs: _.push(appendLog('delivered', `AI 后端已交付 ${resultPhotos.length} 张成片`))
      }
    })

    return {
      ok: true,
      orderId,
      orderNo: order.orderNo,
      resultCount: resultPhotos.length
    }
  } catch (err) {
    await db.collection(COLLECTION).doc(orderId).update({
      data: {
        status: 'rejected',
        updatedAt: db.serverDate(),
        errorMessage: String(err && err.message || err).slice(0, 500),
        statusLogs: _.push(appendLog('rejected', 'AI 后端处理失败，请人工复核'))
      }
    })

    return {
      ok: false,
      error: String(err && err.message || err)
    }
  }
}
