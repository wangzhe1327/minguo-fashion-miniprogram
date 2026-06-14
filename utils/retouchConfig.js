const packages = [
  {
    id: 'basic',
    name: '基础精修',
    price: 19,
    unit: '张',
    tag: '快速干净',
    desc: '适合普通成片优化，包含曝光、肤色、瑕疵和基础构图调整。',
    includes: ['曝光色彩校正', '轻度磨皮祛瑕', '基础裁切构图']
  },
  {
    id: 'portrait',
    name: '人像精修',
    price: 39,
    unit: '张',
    tag: '推荐',
    desc: '适合写真交付，包含肤质、五官、服装细节和画面氛围优化。',
    includes: ['自然肤质精修', '五官轮廓优化', '服饰褶皱整理', '画面氛围统一']
  },
  {
    id: 'commercial',
    name: '商业精修',
    price: 69,
    unit: '张',
    tag: '高标准',
    desc: '适合展示、宣传和付费成片交付，细节更完整，质感更稳定。',
    includes: ['高精度肤质处理', '服饰质感强化', '背景杂物清理', '统一商业色调']
  }
]

const effects = [
  {
    id: 'natural',
    name: '自然通透',
    desc: '保留真实肤色和面料质感，适合大多数写真交付。',
    color: '#2F6D62'
  },
  {
    id: 'minguo-film',
    name: '风华民国',
    desc: '清透肤色、柔和光影、温婉气质和民国画报感，不做蜡黄旧照。',
    color: '#A24E2D'
  },
  {
    id: 'soft-light',
    name: '柔光肤感',
    desc: '柔化高光和皮肤纹理，适合温柔、亲子、儿童主题。',
    color: '#B48345'
  },
  {
    id: 'cinematic',
    name: '高级暗调',
    desc: '压低背景、加强层次和情绪，适合舞台感、夜景和复古大片。',
    color: '#25313A'
  },
  {
    id: 'old-photo',
    name: '雅致画报',
    desc: '轻微纸感和柔和颗粒，保留人物明亮肤色，适合年代感海报。',
    color: '#8A8177'
  }
]

const deliveries = [
  {
    id: 'standard',
    name: '标准交付',
    desc: '预计 48 小时内交付',
    multiplier: 1
  },
  {
    id: 'rush',
    name: '加急交付',
    desc: '预计 24 小时内交付',
    multiplier: 1.3
  },
  {
    id: 'express',
    name: '特急交付',
    desc: '预计 6 小时内优先处理',
    multiplier: 1.8
  }
]

const statusMap = {
  submitted: { text: '已提交', color: '#2F6D62' },
  quoted: { text: '待确认', color: '#B48345' },
  processing: { text: '修图中', color: '#7C3F22' },
  delivered: { text: '已交付', color: '#2F6D62' },
  rejected: { text: '已退回', color: '#B43D32' },
  canceled: { text: '已取消', color: '#8A8177' }
}

function findById(list, id, fallbackIndex) {
  return list.find(item => item.id === id) || list[fallbackIndex || 0]
}

function getPackage(id) {
  return findById(packages, id, 0)
}

function getEffect(id) {
  return findById(effects, id, 0)
}

function getDelivery(id) {
  return findById(deliveries, id, 0)
}

function estimateAmount(photoCount, packageId, deliveryId) {
  const currentPackage = getPackage(packageId)
  const delivery = getDelivery(deliveryId)
  const count = Math.max(0, parseInt(photoCount, 10) || 0)
  return Math.round(currentPackage.price * count * delivery.multiplier)
}

function enrichOrder(order) {
  const currentPackage = getPackage(order.packageId)
  const effect = getEffect(order.effectId)
  const delivery = getDelivery(order.deliveryId)
  const status = statusMap[order.status] || statusMap.submitted

  return {
    ...order,
    packageName: currentPackage.name,
    effectName: effect.name,
    deliveryName: delivery.name,
    statusText: status.text,
    statusColor: status.color
  }
}

module.exports = {
  packages,
  effects,
  deliveries,
  statusMap,
  getPackage,
  getEffect,
  getDelivery,
  estimateAmount,
  enrichOrder
}
