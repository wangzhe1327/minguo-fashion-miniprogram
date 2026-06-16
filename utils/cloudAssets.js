const CLOUD_ENV_ID = 'cloud1-d5grlm249e99949fd'
const CLOUD_FILE_ID_ROOT = 'cloud://cloud1-d5grlm249e99949fd.636c-cloud1-d5grlm249e99949fd-1442266836'
const CLOUD_FOLDER = 'clo' + 'thes'
const CLOUD_FILE_ID_PREFIX = `${CLOUD_FILE_ID_ROOT}/${CLOUD_FOLDER}`
const TEMP_URL_CACHE_KEY = 'cloudAssetTempUrlCache'
const TEMP_URL_CACHE_TTL = 30 * 60 * 1000
const LOCAL_IMAGE_CACHE_KEY = 'cloudAssetLocalImageCache'
const LOCAL_IMAGE_CACHE_VERSION = 1
const LOCAL_IMAGE_CACHE_DELAY = 1200
const LOCAL_IMAGE_CACHE_CONCURRENCY = 2
const MAX_FILE_IDS_PER_BATCH = 50
const tempUrlCache = {}
const tempUrlExpireCache = {}
const localImageCache = {}
const localImageInProgress = {}
let cloudInited = false
let storageCacheLoaded = false
let localImageCacheLoaded = false

function normalizePrefix(prefix) {
  if (!prefix) return ''
  return prefix.endsWith('/') ? prefix : `${prefix}/`
}

function useCloudAssets() {
  return Boolean(normalizePrefix(CLOUD_FILE_ID_PREFIX))
}

function canUseStorage() {
  return typeof wx !== 'undefined' && wx.getStorageSync && wx.setStorageSync
}

function canUsePermanentFileCache() {
  return typeof wx !== 'undefined' &&
    wx.downloadFile &&
    wx.saveFile &&
    wx.getFileSystemManager &&
    wx.env &&
    wx.env.USER_DATA_PATH
}

function saveLocalImageCache() {
  if (!localImageCacheLoaded || !canUseStorage()) return

  try {
    wx.setStorageSync(LOCAL_IMAGE_CACHE_KEY, {
      version: LOCAL_IMAGE_CACHE_VERSION,
      files: localImageCache
    })
  } catch (err) {
    console.warn('save local cloud image cache failed', err)
  }
}

function loadLocalImageCache() {
  if (localImageCacheLoaded || !canUseStorage()) return

  localImageCacheLoaded = true

  try {
    const saved = wx.getStorageSync(LOCAL_IMAGE_CACHE_KEY) || {}
    if (saved.version !== LOCAL_IMAGE_CACHE_VERSION || !saved.files) return

    Object.keys(saved.files).forEach(fileId => {
      const item = saved.files[fileId]
      if (item && item.path) {
        localImageCache[fileId] = item
      }
    })
  } catch (err) {
    console.warn('load local cloud image cache failed', err)
  }
}

function localFileExists(path) {
  if (!path || !canUsePermanentFileCache()) return false

  try {
    wx.getFileSystemManager().accessSync(path)
    return true
  } catch (err) {
    return false
  }
}

function getCachedLocalImage(fileId) {
  loadLocalImageCache()

  const item = localImageCache[fileId]
  if (item && item.path && localFileExists(item.path)) {
    return item.path
  }

  if (item) {
    delete localImageCache[fileId]
    saveLocalImageCache()
  }

  return ''
}

function downloadTempFile(url) {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url,
      success: res => {
        if (res.statusCode && res.statusCode !== 200) {
          reject(new Error(`download image failed: ${res.statusCode}`))
          return
        }
        resolve(res.tempFilePath)
      },
      fail: reject
    })
  })
}

function saveDownloadedFile(tempFilePath) {
  return new Promise((resolve, reject) => {
    wx.saveFile({
      tempFilePath,
      success: res => resolve(res.savedFilePath),
      fail: reject
    })
  })
}

async function cacheLocalImageFile(item) {
  try {
    const tempFilePath = await downloadTempFile(item.tempFileURL)
    const savedFilePath = await saveDownloadedFile(tempFilePath)
    localImageCache[item.fileID] = {
      path: savedFilePath,
      cachedAt: Date.now()
    }
    saveLocalImageCache()
  } catch (err) {
    console.warn('cache cloud image file failed', item.fileID, err)
  } finally {
    delete localImageInProgress[item.fileID]
  }
}

function cacheLocalImageFiles(fileList) {
  if (!canUsePermanentFileCache()) return

  loadLocalImageCache()

  const pending = fileList.filter(item => {
    if (!item.fileID || !item.tempFileURL) return false
    if (localImageInProgress[item.fileID]) return false
    if (getCachedLocalImage(item.fileID)) return false
    localImageInProgress[item.fileID] = true
    return true
  })

  if (!pending.length) return

  setTimeout(() => {
    let index = 0
    const workerCount = Math.min(LOCAL_IMAGE_CACHE_CONCURRENCY, pending.length)
    const workers = Array.from({ length: workerCount }).map(async () => {
      while (index < pending.length) {
        const item = pending[index]
        index += 1
        await cacheLocalImageFile(item)
      }
    })

    Promise.all(workers).catch(err => {
      console.warn('cache local cloud images failed', err)
    })
  }, LOCAL_IMAGE_CACHE_DELAY)
}

function cacheLocalImagesFromTempCache(fileIds) {
  const fileList = Array.from(new Set(fileIds))
    .map(fileID => ({
      fileID,
      tempFileURL: getCachedTempUrl(fileID)
    }))
    .filter(item => item.tempFileURL)

  cacheLocalImageFiles(fileList)
}

function saveTempUrlCache() {
  if (!storageCacheLoaded || !canUseStorage()) return

  const current = Date.now()
  const saved = {}
  Object.keys(tempUrlCache).forEach(fileId => {
    const expiresAt = tempUrlExpireCache[fileId] || 0
    if (tempUrlCache[fileId] && expiresAt > current) {
      saved[fileId] = {
        url: tempUrlCache[fileId],
        expiresAt
      }
    }
  })

  try {
    wx.setStorageSync(TEMP_URL_CACHE_KEY, saved)
  } catch (err) {
    console.warn('save cloud image url cache failed', err)
  }
}

function loadTempUrlCache() {
  if (storageCacheLoaded || !canUseStorage()) return

  storageCacheLoaded = true

  try {
    const saved = wx.getStorageSync(TEMP_URL_CACHE_KEY) || {}
    const current = Date.now()
    let hasExpired = false

    Object.keys(saved).forEach(fileId => {
      const item = saved[fileId]
      if (item && item.url && item.expiresAt > current) {
        tempUrlCache[fileId] = item.url
        tempUrlExpireCache[fileId] = item.expiresAt
      } else {
        hasExpired = true
      }
    })

    if (hasExpired) {
      saveTempUrlCache()
    }
  } catch (err) {
    console.warn('load cloud image url cache failed', err)
  }
}

function getCachedTempUrl(fileId) {
  loadTempUrlCache()

  const url = tempUrlCache[fileId]
  const expiresAt = tempUrlExpireCache[fileId] || 0
  if (url && expiresAt > Date.now()) return url

  if (url || expiresAt) {
    delete tempUrlCache[fileId]
    delete tempUrlExpireCache[fileId]
  }

  return ''
}

function getCachedCloudAssetPath(fileId) {
  return getCachedLocalImage(fileId) || getCachedTempUrl(fileId)
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
  if (isCloudFileId(value)) return getCachedCloudAssetPath(value) || ''
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
  loadTempUrlCache()

  const expiresAt = Date.now() + TEMP_URL_CACHE_TTL
  let hasUpdates = false

  fileList.forEach(item => {
    if (item.fileID && item.tempFileURL) {
      tempUrlCache[item.fileID] = item.tempFileURL
      tempUrlExpireCache[item.fileID] = expiresAt
      hasUpdates = true
    } else {
      console.warn('cloud image url unavailable', item)
    }
  })

  if (hasUpdates) {
    saveTempUrlCache()
    cacheLocalImageFiles(fileList)
  }
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
  loadLocalImageCache()
  loadTempUrlCache()

  const fileIds = []
  collectCloudFileIds(value, fileIds)
  const uniqueFileIds = Array.from(new Set(fileIds))
  const unresolved = uniqueFileIds.filter(fileId => !getCachedCloudAssetPath(fileId))

  if (!unresolved.length) {
    cacheLocalImagesFromTempCache(uniqueFileIds)
    return replaceCloudFileIds(value)
  }

  if (typeof wx === 'undefined' || !wx.cloud || !wx.cloud.getTempFileURL) {
    return replaceCloudFileIds(value)
  }

  initCloud()

  for (let i = 0; i < unresolved.length; i += MAX_FILE_IDS_PER_BATCH) {
    const batch = unresolved.slice(i, i + MAX_FILE_IDS_PER_BATCH)
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

  cacheLocalImagesFromTempCache(uniqueFileIds)
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
