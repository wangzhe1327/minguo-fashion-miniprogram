const { clothingImage, resolveCloudUrls } = require('../../utils/cloudAssets.js')
const data = require('../../utils/data.js')

const models = [
  { name: '优雅女', avatar: clothingImage(8), image: clothingImage(8), height: '165cm' },
  { name: '知性女', avatar: clothingImage(25), image: clothingImage(25), height: '168cm' },
  { name: '温婉女', avatar: clothingImage(35), image: clothingImage(35), height: '162cm' },
  { name: '活泼童', avatar: clothingImage(1), image: clothingImage(1), height: '120cm' }
]

const colors = ['#2E7D4A', '#1A3A5C', '#C41E3A', '#D4A574', '#F5F0E8', '#333333']
const sizes = ['XS', 'S', 'M', 'L', 'XL']

Page({
  data: {
    statusBarHeight: 44,
    item: {},
    models: [],
    selectedModel: 0,
    colors,
    selectedColor: 0,
    sizes,
    selectedSize: 2,
    effectDesc: ''
  },

  async onLoad(options) {
    const sysInfo = wx.getSystemInfoSync()
    const id = parseInt(options.id)
    const item = await resolveCloudUrls(data.getById(id))
    const resolvedModels = await resolveCloudUrls(models)

    if (!item) {
      wx.showToast({ title: '服装不存在', icon: 'error' })
      setTimeout(() => wx.navigateBack(), 1500)
      return
    }

    this.setData({
      statusBarHeight: sysInfo.statusBarHeight,
      item,
      models: resolvedModels,
      effectDesc: this.generateEffectDesc(item, models[0], sizes[2])
    })
  },

  generateEffectDesc(item, model, size) {
    const modelName = model.name
    const height = model.height
    const sizeStr = size
    let styleDesc = ''
    if (item.category === 'qipao') {
      styleDesc = '旗袍修身剪裁展现优美曲线，立领盘扣设计端庄典雅。'
    } else if (item.category === 'tongzhuang') {
      styleDesc = '童装版型合身，活泼可爱，细节精致考究。'
    } else if (item.category === 'hanfu') {
      styleDesc = '汉服飘逸大气，古典优雅，尽显华夏衣冠之美。'
    } else {
      styleDesc = '版型合身，线条流畅，设计精美。'
    }
    return `${modelName}（${height}）试穿${item.name}，${sizeStr}码效果：版型合身，线条流畅。${styleDesc}`
  },

  onModelSelect(e) {
    const index = e.currentTarget.dataset.index
    const effectDesc = this.generateEffectDesc(this.data.item, models[index], sizes[this.data.selectedSize])
    this.setData({ selectedModel: index, effectDesc })
  },

  onColorSelect(e) {
    this.setData({ selectedColor: e.currentTarget.dataset.index })
  },

  onSizeSelect(e) {
    const index = e.currentTarget.dataset.index
    const effectDesc = this.generateEffectDesc(this.data.item, models[this.data.selectedModel], sizes[index])
    this.setData({ selectedSize: index, effectDesc })
  },

  goBack() {
    wx.navigateBack()
  }
})
