const CLOUD_ENV_ID = 'cloud1-d5grlm249e99949fd'
const CLOUD_FILE_ID_ROOT = 'cloud://cloud1-d5grlm249e99949fd.636c-cloud1-d5grlm249e99949fd-1442266836'
const CLOUD_FOLDER = 'clo' + 'thes'
const CLOUD_FILE_ID_PREFIX = `${CLOUD_FILE_ID_ROOT}/${CLOUD_FOLDER}`
const tempUrlCache = {}
let cloudInited = false

function normalizePrefix(prefix) {
  if (!prefix) return ''
  return prefix.endsWith('/') ? prefix : `${prefix}/`
}

function useCloudAssets() {
  return Boolean(normalizePrefix(CLOUD_FILE_ID_PREFIX))
}

function initCloud() {
  if (typeof wx === 'undefined' || !wx.cloud || cloudInited || !useCloudAssets()) return
  wx.cloud.init({
    env: CLOUD_ENV_ID,
    traceUser: true
  })
  cloudInited = true
}

function clothingImage(imageNo) {
  const prefix = normalizePrefix(CLOUD_FILE_ID_PREFIX)
  if (!prefix) return ''
  const fileNo = String(imageNo).padStart(2, '0')
  const fileName = `${CLOUD_FOLDER}_${fileNo}.jpg`
  return `${prefix}${fileName}`
}

function isCloudFileId(value) {
  return typeof value === 'string' && value.indexOf('cloud://') === 0
}

function collectCloudFileIds(value, fileIds) {
  if (isCloudFileId(value)) {
    fileIds.push(value)
    return
  }
  if (Array.isArray(value)) {
    value.forEach(item => collectCloudFileIds(item, fileIds))
    return
  }
  if (value && typeof value === 'object') {
    Object.keys(value).forEach(key => collectCloudFileIds(value[key], fileIds))
  }
}

function replaceCloudFileIds(value) {
  if (isCloudFileId(value)) return tempUrlCache[value] || ''
  if (Array.isArray(value)) return value.map(item => replaceCloudFileIds(item))
  if (value && typeof value === 'object') {
    const next = {}
    Object.keys(value).forEach(key => {
      next[key] = replaceCloudFileIds(value[key])
    })
    return next
  }
  return value
}

function cacheTempFileURLs(fileList) {
  fileList.forEach(item => {
    if (item.fileID && item.tempFileURL) {
      tempUrlCache[item.fileID] = item.tempFileURL
    } else {
      console.warn('cloud image url unavailable', item)
    }
  })
}

function getTempFileURLByFunction(fileList) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'resolveImageUrls',
      data: { fileList },
      success: res => {
        const result = res.result || {}
        cacheTempFileURLs(result.fileList || [])
        resolve()
      },
      fail: reject
    })
  })
}

function getTempFileURLDirectly(fileList) {
  return new Promise((resolve, reject) => {
    wx.cloud.getTempFileURL({
      fileList,
      success: res => {
        cacheTempFileURLs(res.fileList || [])
        resolve()
      },
      fail: reject
    })
  })
}

async function resolveCloudUrls(value) {
  const fileIds = []
  collectCloudFileIds(value, fileIds)
  const unresolved = Array.from(new Set(fileIds)).filter(fileId => !tempUrlCache[fileId])

  if (!unresolved.length) {
    return replaceCloudFileIds(value)
  }

  if (typeof wx === 'undefined' || !wx.cloud || !wx.cloud.getTempFileURL) {
    return replaceCloudFileIds(value)
  }

  initCloud()

  for (let i = 0; i < unresolved.length; i += 10) {
    const batch = unresolved.slice(i, i + 10)
    try {
      await getTempFileURLByFunction(batch)
    } catch (err) {
      console.warn('resolve cloud image url by function failed, fallback to direct api', err)
      try {
        await getTempFileURLDirectly(batch)
      } catch (directErr) {
        console.warn('resolve cloud image url batch failed', directErr)
      }
    }
  }

  return replaceCloudFileIds(value)
}

module.exports = {
  CLOUD_ENV_ID,
  CLOUD_FILE_ID_PREFIX,
  useCloudAssets,
  initCloud,
  clothingImage,
  resolveCloudUrls
}
