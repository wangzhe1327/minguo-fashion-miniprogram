const { clothingImage } = require('./cloudAssets.js')
const categories = [
  { id: 'all', name: '精选' },
  { id: 'qipao', name: '旗袍' },
  { id: 'tongzhuang', name: '童装' },
  { id: 'hanfu', name: '汉服' }
]

const banners = [
  {
    id: 1,
    title: '墨绿提花旗袍',
    subtitle: '旗袍精选',
    desc: '墨绿色缎面提花面料，立领盘扣，手持折扇，古典雅致...',
    image: clothingImage(8),
    color: '#8B4513'
  },
  {
    id: 2,
    title: '黑色亮面旗袍',
    subtitle: '旗袍精选',
    desc: '黑色亮面面料，金色纹路，复古奢华，留声机背景...',
    image: clothingImage(25),
    color: '#8B4513'
  },
  {
    id: 3,
    title: '新中式马面裙套装',
    subtitle: '汉服精选',
    desc: '白色刺绣上衣配黑色印花马面裙，古典优雅...',
    image: clothingImage(7),
    color: '#8B4513'
  },
]

const clothingList = [
  {
    id: 1,
    name: '儿童米色西装六件套',
    category: 'tongzhuang',
    categoryName: '男童',
    subtitle: '花童礼服，米色西装套装，含西装外套、马甲...',
    desc: '花童礼服，米色西装套装，含西装外套、马甲、衬衫、长裤、领结、胸花',
    detailDesc: '款式：儿童米色西装六件套\n类别：男童\n描述：花童礼服，米色西装套装，含西装外套、马甲、衬衫、长裤、领结、胸花\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(1),
    images: [clothingImage(1)],
    serialNo: '01',
    tags: ['童装', '可爱', '精致'],
    liked: false
  },
  {
    id: 2,
    name: '儿童黑白背带四件套',
    category: 'tongzhuang',
    categoryName: '男童',
    subtitle: '经典黑白配色，含衬衫、短裤、领结、背带，...',
    desc: '经典黑白配色，含衬衫、短裤、领结、背带，帅气有型',
    detailDesc: '款式：儿童黑白背带四件套\n类别：男童\n描述：经典黑白配色，含衬衫、短裤、领结、背带，帅气有型\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(2),
    images: [clothingImage(2)],
    serialNo: '02',
    tags: ['童装', '可爱', '精致'],
    liked: false
  },
  {
    id: 3,
    name: '儿童粉色马甲五件套',
    category: 'tongzhuang',
    categoryName: '男童',
    subtitle: '温柔粉色系，含马甲、衬衫、短裤、领结、胸...',
    desc: '温柔粉色系，含马甲、衬衫、短裤、领结、胸花，绅士优雅',
    detailDesc: '款式：儿童粉色马甲五件套\n类别：男童\n描述：温柔粉色系，含马甲、衬衫、短裤、领结、胸花，绅士优雅\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(3),
    images: [clothingImage(3)],
    serialNo: '03',
    tags: ['童装', '可爱', '精致'],
    liked: false
  },
  {
    id: 4,
    name: '儿童胡子背带四件套',
    category: 'tongzhuang',
    categoryName: '男童',
    subtitle: '趣味胡子图案背带，黑白经典配色，活泼可爱...',
    desc: '趣味胡子图案背带，黑白经典配色，活泼可爱',
    detailDesc: '款式：儿童胡子背带四件套\n类别：男童\n描述：趣味胡子图案背带，黑白经典配色，活泼可爱\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(4),
    images: [clothingImage(4)],
    serialNo: '04',
    tags: ['童装', '可爱', '精致'],
    liked: false
  },
  {
    id: 5,
    name: '儿童米色马甲短裤套装',
    category: 'tongzhuang',
    categoryName: '男童',
    subtitle: '米色马甲配短裤，清新淡雅，适合多种场合...',
    desc: '米色马甲配短裤，清新淡雅，适合多种场合',
    detailDesc: '款式：儿童米色马甲短裤套装\n类别：男童\n描述：米色马甲配短裤，清新淡雅，适合多种场合\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(5),
    images: [clothingImage(5)],
    serialNo: '05',
    tags: ['童装', '可爱', '精致'],
    liked: false
  },
  {
    id: 6,
    name: '儿童卡其色西装套装',
    category: 'tongzhuang',
    categoryName: '男童',
    subtitle: '卡其色西装外套配长裤，绅士小礼服风格...',
    desc: '卡其色西装外套配长裤，绅士小礼服风格',
    detailDesc: '款式：儿童卡其色西装套装\n类别：男童\n描述：卡其色西装外套配长裤，绅士小礼服风格\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(6),
    images: [clothingImage(6)],
    serialNo: '06',
    tags: ['童装', '可爱', '精致'],
    liked: false
  },
  {
    id: 7,
    name: '新中式马面裙套装',
    category: 'hanfu',
    categoryName: '汉服',
    subtitle: '白色刺绣上衣配黑色印花马面裙，古典优雅...',
    desc: '白色刺绣上衣配黑色印花马面裙，古典优雅',
    detailDesc: '款式：新中式马面裙套装\n类别：汉服\n描述：白色刺绣上衣配黑色印花马面裙，古典优雅\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(7),
    images: [clothingImage(7)],
    serialNo: '07',
    tags: ['汉服', '古典', '刺绣'],
    liked: false
  },
  {
    id: 8,
    name: '墨绿提花旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '墨绿色缎面提花面料，立领盘扣，手持折扇，...',
    desc: '墨绿色缎面提花面料，立领盘扣，手持折扇，古典雅致',
    detailDesc: '款式：墨绿提花旗袍\n类别：旗袍\n描述：墨绿色缎面提花面料，立领盘扣，手持折扇，古典雅致\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(8),
    images: [clothingImage(8)],
    serialNo: '08',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 9,
    name: '橄榄绿蕾丝旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '橄榄绿色蕾丝面料，修身剪裁，手持团扇，温...',
    desc: '橄榄绿色蕾丝面料，修身剪裁，手持团扇，温婉动人',
    detailDesc: '款式：橄榄绿蕾丝旗袍\n类别：旗袍\n描述：橄榄绿色蕾丝面料，修身剪裁，手持团扇，温婉动人\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(9),
    images: [clothingImage(9)],
    serialNo: '09',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 10,
    name: '蓝格纯棉旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '浅蓝色格子纯棉面料，七分袖设计，清新文艺...',
    desc: '浅蓝色格子纯棉面料，七分袖设计，清新文艺',
    detailDesc: '款式：蓝格纯棉旗袍\n类别：旗袍\n描述：浅蓝色格子纯棉面料，七分袖设计，清新文艺\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(10),
    images: [clothingImage(10)],
    serialNo: '10',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 11,
    name: '墨绿短袖旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '墨绿色短袖旗袍，手持折扇，园林外景，古典...',
    desc: '墨绿色短袖旗袍，手持折扇，园林外景，古典韵味',
    detailDesc: '款式：墨绿短袖旗袍\n类别：旗袍\n描述：墨绿色短袖旗袍，手持折扇，园林外景，古典韵味\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(11),
    images: [clothingImage(11)],
    serialNo: '11',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 12,
    name: '灰色棉麻旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '灰色棉麻面料，白色盘扣装饰，简约素雅...',
    desc: '灰色棉麻面料，白色盘扣装饰，简约素雅',
    detailDesc: '款式：灰色棉麻旗袍\n类别：旗袍\n描述：灰色棉麻面料，白色盘扣装饰，简约素雅\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(12),
    images: [clothingImage(12)],
    serialNo: '12',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 13,
    name: '黑金披肩旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '黑色蕾丝旗袍配黑色流苏披肩，金色纹样，华...',
    desc: '黑色蕾丝旗袍配黑色流苏披肩，金色纹样，华丽复古',
    detailDesc: '款式：黑金披肩旗袍\n类别：旗袍\n描述：黑色蕾丝旗袍配黑色流苏披肩，金色纹样，华丽复古\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(13),
    images: [clothingImage(13)],
    serialNo: '13',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 14,
    name: '印花圆盘旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '米色底印花圆盘图案旗袍，搭配草帽，法式中...',
    desc: '米色底印花圆盘图案旗袍，搭配草帽，法式中国风',
    detailDesc: '款式：印花圆盘旗袍\n类别：旗袍\n描述：米色底印花圆盘图案旗袍，搭配草帽，法式中国风\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(14),
    images: [clothingImage(14)],
    serialNo: '14',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 15,
    name: '条纹素雅旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '白底黑条纹旗袍，手持绿叶，清新自然...',
    desc: '白底黑条纹旗袍，手持绿叶，清新自然',
    detailDesc: '款式：条纹素雅旗袍\n类别：旗袍\n描述：白底黑条纹旗袍，手持绿叶，清新自然\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(15),
    images: [clothingImage(15)],
    serialNo: '15',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 16,
    name: '灰色碎花旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '灰色底碎花图案旗袍，无袖设计，端庄大方...',
    desc: '灰色底碎花图案旗袍，无袖设计，端庄大方',
    detailDesc: '款式：灰色碎花旗袍\n类别：旗袍\n描述：灰色底碎花图案旗袍，无袖设计，端庄大方\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(16),
    images: [clothingImage(16)],
    serialNo: '16',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 17,
    name: '儿童浅蓝旗袍裙',
    category: 'tongzhuang',
    categoryName: '女童',
    subtitle: '浅蓝色无袖旗袍上衣配白色蕾丝裙摆，手持团...',
    desc: '浅蓝色无袖旗袍上衣配白色蕾丝裙摆，手持团扇，清新甜美',
    detailDesc: '款式：儿童浅蓝旗袍裙\n类别：女童\n描述：浅蓝色无袖旗袍上衣配白色蕾丝裙摆，手持团扇，清新甜美\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(17),
    images: [clothingImage(17)],
    serialNo: '17',
    tags: ['童装', '可爱', '精致'],
    liked: false
  },
  {
    id: 18,
    name: '儿童粉色刺绣套装',
    category: 'tongzhuang',
    categoryName: '女童',
    subtitle: '粉色刺绣马甲配白色百褶裙，手持蝴蝶扇，精...',
    desc: '粉色刺绣马甲配白色百褶裙，手持蝴蝶扇，精致可爱',
    detailDesc: '款式：儿童粉色刺绣套装\n类别：女童\n描述：粉色刺绣马甲配白色百褶裙，手持蝴蝶扇，精致可爱\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(18),
    images: [clothingImage(18)],
    serialNo: '18',
    tags: ['童装', '可爱', '精致'],
    liked: false
  },
  {
    id: 19,
    name: '儿童粉色蛋糕裙',
    category: 'tongzhuang',
    categoryName: '女童',
    subtitle: '粉色无袖旗袍上衣配白色蛋糕裙摆，手持蝴蝶...',
    desc: '粉色无袖旗袍上衣配白色蛋糕裙摆，手持蝴蝶扇，甜美俏皮',
    detailDesc: '款式：儿童粉色蛋糕裙\n类别：女童\n描述：粉色无袖旗袍上衣配白色蛋糕裙摆，手持蝴蝶扇，甜美俏皮\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(19),
    images: [clothingImage(19)],
    serialNo: '19',
    tags: ['童装', '可爱', '精致'],
    liked: false
  },
  {
    id: 20,
    name: '黑色丝绒旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '黑色丝绒面料，白色珍珠装饰领口，手持团扇...',
    desc: '黑色丝绒面料，白色珍珠装饰领口，手持团扇，高贵典雅',
    detailDesc: '款式：黑色丝绒旗袍\n类别：旗袍\n描述：黑色丝绒面料，白色珍珠装饰领口，手持团扇，高贵典雅\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(20),
    images: [clothingImage(20)],
    serialNo: '20',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 21,
    name: '紫色丝绒旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '紫色丝绒面料，立领设计，高贵神秘...',
    desc: '紫色丝绒面料，立领设计，高贵神秘',
    detailDesc: '款式：紫色丝绒旗袍\n类别：旗袍\n描述：紫色丝绒面料，立领设计，高贵神秘\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(21),
    images: [clothingImage(21)],
    serialNo: '21',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 22,
    name: '粉色刺绣旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '粉色刺绣面料，短款设计，甜美可人...',
    desc: '粉色刺绣面料，短款设计，甜美可人',
    detailDesc: '款式：粉色刺绣旗袍\n类别：旗袍\n描述：粉色刺绣面料，短款设计，甜美可人\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(22),
    images: [clothingImage(22)],
    serialNo: '22',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 23,
    name: '红色蕾丝旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '红色蕾丝面料，修身剪裁，喜庆热烈...',
    desc: '红色蕾丝面料，修身剪裁，喜庆热烈',
    detailDesc: '款式：红色蕾丝旗袍\n类别：旗袍\n描述：红色蕾丝面料，修身剪裁，喜庆热烈\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(23),
    images: [clothingImage(23)],
    serialNo: '23',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 24,
    name: '蓝色真丝旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '蓝色真丝面料，水墨印花，清雅脱俗...',
    desc: '蓝色真丝面料，水墨印花，清雅脱俗',
    detailDesc: '款式：蓝色真丝旗袍\n类别：旗袍\n描述：蓝色真丝面料，水墨印花，清雅脱俗\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(24),
    images: [clothingImage(24)],
    serialNo: '24',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 25,
    name: '黑色亮面旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '黑色亮面面料，金色纹路，复古奢华，留声机...',
    desc: '黑色亮面面料，金色纹路，复古奢华，留声机背景',
    detailDesc: '款式：黑色亮面旗袍\n类别：旗袍\n描述：黑色亮面面料，金色纹路，复古奢华，留声机背景\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(25),
    images: [clothingImage(25)],
    serialNo: '25',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 26,
    name: '白色蕾丝旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '白色蕾丝面料，纯洁优雅，适合多种场合...',
    desc: '白色蕾丝面料，纯洁优雅，适合多种场合',
    detailDesc: '款式：白色蕾丝旗袍\n类别：旗袍\n描述：白色蕾丝面料，纯洁优雅，适合多种场合\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(26),
    images: [clothingImage(26)],
    serialNo: '26',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 27,
    name: '绿色碎花旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '绿色底碎花图案，清新自然，田园风格...',
    desc: '绿色底碎花图案，清新自然，田园风格',
    detailDesc: '款式：绿色碎花旗袍\n类别：旗袍\n描述：绿色底碎花图案，清新自然，田园风格\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(27),
    images: [clothingImage(27)],
    serialNo: '27',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 28,
    name: '黄色真丝旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '黄色真丝面料，金色刺绣，华贵大气...',
    desc: '黄色真丝面料，金色刺绣，华贵大气',
    detailDesc: '款式：黄色真丝旗袍\n类别：旗袍\n描述：黄色真丝面料，金色刺绣，华贵大气\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(28),
    images: [clothingImage(28)],
    serialNo: '28',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 29,
    name: '藏青印花旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '藏青色底印花面料，沉稳大气...',
    desc: '藏青色底印花面料，沉稳大气',
    detailDesc: '款式：藏青印花旗袍\n类别：旗袍\n描述：藏青色底印花面料，沉稳大气\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(29),
    images: [clothingImage(29)],
    serialNo: '29',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 30,
    name: '蓝色刺绣旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '蓝色刺绣面料，手持珍珠包，优雅知性...',
    desc: '蓝色刺绣面料，手持珍珠包，优雅知性',
    detailDesc: '款式：蓝色刺绣旗袍\n类别：旗袍\n描述：蓝色刺绣面料，手持珍珠包，优雅知性\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(30),
    images: [clothingImage(30)],
    serialNo: '30',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 31,
    name: '米色提花旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '米色提花面料，简约大方，日常穿着...',
    desc: '米色提花面料，简约大方，日常穿着',
    detailDesc: '款式：米色提花旗袍\n类别：旗袍\n描述：米色提花面料，简约大方，日常穿着\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(31),
    images: [clothingImage(31)],
    serialNo: '31',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 32,
    name: '粉色碎花旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '粉色碎花面料，甜美浪漫...',
    desc: '粉色碎花面料，甜美浪漫',
    detailDesc: '款式：粉色碎花旗袍\n类别：旗袍\n描述：粉色碎花面料，甜美浪漫\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(32),
    images: [clothingImage(32)],
    serialNo: '32',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 33,
    name: '墨绿丝绒旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '墨绿色丝绒面料，高贵典雅...',
    desc: '墨绿色丝绒面料，高贵典雅',
    detailDesc: '款式：墨绿丝绒旗袍\n类别：旗袍\n描述：墨绿色丝绒面料，高贵典雅\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(33),
    images: [clothingImage(33)],
    serialNo: '33',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 34,
    name: '紫色印花旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '紫色印花面料，浪漫唯美...',
    desc: '紫色印花面料，浪漫唯美',
    detailDesc: '款式：紫色印花旗袍\n类别：旗袍\n描述：紫色印花面料，浪漫唯美\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(34),
    images: [clothingImage(34)],
    serialNo: '34',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 35,
    name: '浅绿刺绣旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '浅绿色刺绣面料，园林背景，清新雅致...',
    desc: '浅绿色刺绣面料，园林背景，清新雅致',
    detailDesc: '款式：浅绿刺绣旗袍\n类别：旗袍\n描述：浅绿色刺绣面料，园林背景，清新雅致\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(35),
    images: [clothingImage(35)],
    serialNo: '35',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 36,
    name: '红色刺绣旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '红色刺绣面料，喜庆吉祥...',
    desc: '红色刺绣面料，喜庆吉祥',
    detailDesc: '款式：红色刺绣旗袍\n类别：旗袍\n描述：红色刺绣面料，喜庆吉祥\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(36),
    images: [clothingImage(36)],
    serialNo: '36',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 37,
    name: '蓝色格子旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '蓝色格子面料，复古文艺...',
    desc: '蓝色格子面料，复古文艺',
    detailDesc: '款式：蓝色格子旗袍\n类别：旗袍\n描述：蓝色格子面料，复古文艺\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(37),
    images: [clothingImage(37)],
    serialNo: '37',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 38,
    name: '黄色条纹旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '黄色条纹面料，明快活泼...',
    desc: '黄色条纹面料，明快活泼',
    detailDesc: '款式：黄色条纹旗袍\n类别：旗袍\n描述：黄色条纹面料，明快活泼\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(38),
    images: [clothingImage(38)],
    serialNo: '38',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 39,
    name: '粉色蕾丝旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '粉色蕾丝面料，甜美优雅...',
    desc: '粉色蕾丝面料，甜美优雅',
    detailDesc: '款式：粉色蕾丝旗袍\n类别：旗袍\n描述：粉色蕾丝面料，甜美优雅\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(39),
    images: [clothingImage(39)],
    serialNo: '39',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 40,
    name: '米白刺绣旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '米白色刺绣面料，楼梯背景，温婉知性...',
    desc: '米白色刺绣面料，楼梯背景，温婉知性',
    detailDesc: '款式：米白刺绣旗袍\n类别：旗袍\n描述：米白色刺绣面料，楼梯背景，温婉知性\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(40),
    images: [clothingImage(40)],
    serialNo: '40',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 41,
    name: '黑色蕾丝旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '黑色蕾丝面料，神秘性感...',
    desc: '黑色蕾丝面料，神秘性感',
    detailDesc: '款式：黑色蕾丝旗袍\n类别：旗袍\n描述：黑色蕾丝面料，神秘性感\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(41),
    images: [clothingImage(41)],
    serialNo: '41',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 42,
    name: '绿色真丝旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '绿色真丝面料，清新自然...',
    desc: '绿色真丝面料，清新自然',
    detailDesc: '款式：绿色真丝旗袍\n类别：旗袍\n描述：绿色真丝面料，清新自然\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(42),
    images: [clothingImage(42)],
    serialNo: '42',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 43,
    name: '金色刺绣旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '金色刺绣面料，华贵大气...',
    desc: '金色刺绣面料，华贵大气',
    detailDesc: '款式：金色刺绣旗袍\n类别：旗袍\n描述：金色刺绣面料，华贵大气\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(43),
    images: [clothingImage(43)],
    serialNo: '43',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 44,
    name: '紫色丝绒旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '紫色丝绒面料，高贵典雅...',
    desc: '紫色丝绒面料，高贵典雅',
    detailDesc: '款式：紫色丝绒旗袍\n类别：旗袍\n描述：紫色丝绒面料，高贵典雅\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(44),
    images: [clothingImage(44)],
    serialNo: '44',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 45,
    name: '米色印花旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '米色印花面料，手持白花，温柔雅致...',
    desc: '米色印花面料，手持白花，温柔雅致',
    detailDesc: '款式：米色印花旗袍\n类别：旗袍\n描述：米色印花面料，手持白花，温柔雅致\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(45),
    images: [clothingImage(45)],
    serialNo: '45',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 46,
    name: '红色丝绒旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '红色丝绒面料，喜庆热烈...',
    desc: '红色丝绒面料，喜庆热烈',
    detailDesc: '款式：红色丝绒旗袍\n类别：旗袍\n描述：红色丝绒面料，喜庆热烈\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(46),
    images: [clothingImage(46)],
    serialNo: '46',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 47,
    name: '黄色短款旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '黄色短款旗袍，珍珠手提包，明媚动人...',
    desc: '黄色短款旗袍，珍珠手提包，明媚动人',
    detailDesc: '款式：黄色短款旗袍\n类别：旗袍\n描述：黄色短款旗袍，珍珠手提包，明媚动人\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(47),
    images: [clothingImage(47)],
    serialNo: '47',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
  {
    id: 48,
    name: '黑底红花旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    subtitle: '黑色底红色花卉印花，古典园林背景，雍容华...',
    desc: '黑色底红色花卉印花，古典园林背景，雍容华贵',
    detailDesc: '款式：黑底红花旗袍\n类别：旗袍\n描述：黑色底红色花卉印花，古典园林背景，雍容华贵\n适合场合：日常穿着、拍照写真、节日聚会',
    image: clothingImage(48),
    images: [clothingImage(48)],
    serialNo: '48',
    tags: ['旗袍', '传统', '优雅'],
    liked: false
  },
]

function buildDetailDesc(meta) {
  return [
    `款式：${meta.name}`,
    `类别：${meta.categoryName}`,
    `颜色：${meta.color}`,
    `版型：${meta.silhouette}`,
    `面料观感：${meta.material}`,
    `适合场景：${meta.scene}`,
    `搭配建议：${meta.pairing}`,
    `注意事项：${meta.note}`
  ].join('\n')
}

const clothingMetadata = {
  1: {
    name: '儿童米色西装礼服',
    category: 'tongzhuang',
    categoryName: '男童',
    color: '暖米色',
    silhouette: '短款西装外套配长裤，整体挺括利落',
    material: '哑光西装面料，画面干净，适合正式感造型',
    scene: '花童、亲子写真、生日照、家庭纪念照',
    pairing: '可搭配白衬衫、领结和浅色皮鞋，背景选择欧式街景或室内棚拍都协调',
    note: '儿童款建议优先确认身高、肩宽和裤长，活动量较大时留出舒适余量',
    subtitle: '暖米色儿童西装套装，干净正式，适合花童与亲子写真。',
    desc: '暖米色儿童西装礼服，廓形挺括，镜头里显得清爽、端正，适合需要正式感的男童造型。',
    tags: ['男童', '礼服', '正式'],
    styleTips: [
      '适合花童、生日照、亲子写真和学校活动，画面风格偏干净正式。',
      '建议搭配白衬衫、领结和浅色皮鞋，避免过多深色配件压低童装轻盈感。',
      '下单前请确认身高、肩宽、胸围和裤长，儿童款建议预留活动余量。'
    ]
  },
  2: {
    name: '儿童黑白背带短裤套装',
    category: 'tongzhuang',
    categoryName: '男童',
    color: '白色衬衫搭配黑色短裤',
    silhouette: '短袖衬衫配背带短裤，比例活泼利落',
    material: '衬衫面料清爽，背带与短裤形成经典黑白对比',
    scene: '儿童写真、校园主题、亲子照、夏季活动',
    pairing: '适合搭配黑色皮鞋、白袜和小领结，背景宜选择街景、校园或复古室内',
    note: '短裤款需确认腰围和裤长，拍摄前检查背带松紧是否舒适',
    subtitle: '黑白背带短裤套装，活泼清爽，适合儿童复古写真。',
    desc: '经典黑白配色的男童背带短裤套装，上镜轻快，有校园感和复古童趣。',
    tags: ['男童', '背带', '清爽'],
    styleTips: [
      '适合校园风、儿童节、夏季亲子照和复古街景拍摄。',
      '白袜和黑色小皮鞋会让比例更完整，领结可根据场景选择黑色或深棕色。',
      '下单前请确认腰围、裤长和背带调节范围，避免拍摄时滑落。'
    ]
  },
  3: {
    name: '儿童粉色马甲短裤套装',
    category: 'tongzhuang',
    categoryName: '男童',
    color: '浅粉色',
    silhouette: '马甲配短裤，线条轻巧，少年感明显',
    material: '柔和粉色西装面料，视觉温柔但不花哨',
    scene: '生日写真、亲子照、花童、春夏户外拍摄',
    pairing: '可搭配白衬衫、浅色袜子和圆头皮鞋，适合明亮背景',
    note: '浅色款容易显脏，户外拍摄建议准备备用清洁湿巾',
    subtitle: '浅粉儿童马甲短裤套装，温柔精致，适合春夏童装造型。',
    desc: '浅粉色男童马甲短裤套装，色调柔和，适合想要干净、可爱又有仪式感的儿童造型。',
    tags: ['男童', '粉色', '花童'],
    styleTips: [
      '适合生日、花童、春夏外景和柔和色系亲子照。',
      '建议搭配白衬衫和浅色鞋袜，背景选择米色、砖墙或花园会更协调。',
      '浅色套装拍摄前注意保持整洁，确认孩子坐下和走动时短裤长度舒适。'
    ]
  },
  4: {
    name: '儿童黑白背带礼服套装',
    category: 'tongzhuang',
    categoryName: '男童',
    color: '黑白拼色',
    silhouette: '白衬衫、黑短裤与背带组合，层次清楚',
    material: '衬衫清爽，短裤和背带偏礼服质感',
    scene: '儿童写真、节日活动、家庭纪念照、校园主题',
    pairing: '搭配黑色领结和白袜，能强化复古小绅士气质',
    note: '适合偏瘦到标准体型，建议确认肩带长度和腰部松紧',
    subtitle: '黑白背带礼服套装，复古小绅士感强，适合正式童装拍摄。',
    desc: '黑白背带儿童礼服，造型简洁但仪式感明确，适合男童正式或复古主题照片。',
    tags: ['男童', '背带', '复古'],
    styleTips: [
      '适合小绅士主题、节日活动、毕业照和亲子纪念照。',
      '领结、白袜和黑色皮鞋是关键配件，能让整体更完整。',
      '拍摄前确认背带长度，避免肩带过松影响正面造型。'
    ]
  },
  5: {
    name: '儿童米色马甲短裤套装',
    category: 'tongzhuang',
    categoryName: '男童',
    color: '米杏色',
    silhouette: '马甲配短裤，线条简洁，清爽轻便',
    material: '浅色西装感面料，适合明亮外景',
    scene: '儿童写真、亲子旅拍、生日照、春夏户外活动',
    pairing: '搭配白衬衫、浅口皮鞋或乐福鞋，适合暖色建筑背景',
    note: '短裤款更适合春夏拍摄，秋冬需另配长袜或外套',
    subtitle: '米杏色儿童马甲短裤套装，轻便清爽，适合亲子旅拍。',
    desc: '米杏色男童马甲短裤套装，简洁明亮，适合轻松自然的儿童写真和亲子旅拍。',
    tags: ['男童', '米色', '轻礼服'],
    styleTips: [
      '适合春夏外景、亲子旅拍和生日写真，画面会比较轻盈。',
      '建议搭配白衬衫与浅色鞋袜，背景用砖墙、草地或欧式街景都好看。',
      '下单前确认腰围、裤长和季节温度，冷天需准备外搭。'
    ]
  },
  6: {
    name: '米白飘带上衣棕色半裙',
    category: 'hanfu',
    categoryName: '新中式',
    color: '米白上衣搭配焦糖棕半裙',
    silhouette: '短袖飘带上衣配高腰长裙，线条文雅舒展',
    material: '上衣轻薄清爽，半裙带自然垂感',
    scene: '民国风写真、文艺旅拍、日常轻复古、姐妹照',
    pairing: '适合搭配低跟鞋、复古手包和珍珠耳饰，发型可选择低盘发或自然卷',
    note: '半裙长度偏长，建议确认身高和鞋跟高度，避免拖地',
    subtitle: '米白飘带上衣配焦糖棕长裙，文艺温柔，适合民国风旅拍。',
    desc: '米白飘带上衣与焦糖棕半裙组合，气质温柔，适合文艺、复古、旅拍类画面。',
    tags: ['新中式', '半裙', '文艺'],
    styleTips: [
      '适合民国风街景、书店、咖啡馆和文艺旅拍，整体气质温柔不张扬。',
      '建议配珍珠耳饰、复古小包和低跟鞋，发型以低盘发或自然卷更协调。',
      '下单前确认裙长、腰围和鞋跟高度，长裙拍摄走动时要留意台阶。'
    ]
  },
  7: {
    name: '白色刺绣上衣黑色马面裙',
    category: 'qipao',
    categoryName: '马面裙',
    color: '白色上衣搭配黑色刺绣马面裙',
    silhouette: '修身上衣配高腰马面裙，端庄且显比例',
    material: '上衣带刺绣细节，裙摆黑底绣花质感较强',
    scene: '国风写真、新中式活动、茶馆、园林或古建外景',
    pairing: '适合搭配黑色绣鞋、团扇、发簪或珍珠耳饰',
    note: '马面裙腰部位置影响比例，建议确认腰围并搭配合适鞋跟',
    subtitle: '白色刺绣上衣配黑色马面裙，端庄大气，国风感强。',
    desc: '白色刺绣上衣搭配黑色马面裙，黑白对比清晰，适合端庄的新中式与国风造型。',
    tags: ['马面裙', '国风', '刺绣'],
    styleTips: [
      '适合国风写真、茶馆、园林、古建和新中式活动场景。',
      '建议搭配团扇、发簪或珍珠耳饰，鞋履选择黑色或米色更稳。',
      '下单前确认腰围和裙长，马面裙腰线位置会明显影响整体比例。'
    ]
  },
  8: {
    name: '橄榄绿无袖改良旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '橄榄绿',
    silhouette: '无袖修身长款，线条简洁显身形',
    material: '哑光细纹面料，质感克制，高级感较强',
    scene: '民国街景、复古写真、轻晚宴、个人形象照',
    pairing: '适合搭配珍珠耳饰、团扇或小手包，妆容可偏复古红唇',
    note: '无袖修身款对肩颈和腰胯线条要求较高，建议确认胸腰臀围',
    subtitle: '橄榄绿无袖长旗袍，简洁修身，适合高级复古人像。',
    desc: '橄榄绿无袖改良旗袍，线条利落，色调沉稳，适合精致复古和民国街景拍摄。',
    tags: ['旗袍', '无袖', '高级'],
    styleTips: [
      '适合民国街景、复古写真和轻正式活动，成片气质偏成熟高级。',
      '珍珠耳饰、小手包和复古红唇会提升完整度，配件不宜太繁复。',
      '无袖修身款建议重点确认胸围、腰围、臀围和肩颈状态。'
    ]
  },
  9: {
    name: '驼色无袖针织旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '暖驼色',
    silhouette: '无袖中长款，贴身但风格日常',
    material: '针织感纹理柔和，画面亲和自然',
    scene: '日常复古写真、咖啡馆、街景、轻熟风形象照',
    pairing: '适合搭配棕色小包、低跟鞋和简洁耳饰',
    note: '针织贴身款容易显身形，建议确认腰腹和臀围余量',
    subtitle: '暖驼色无袖针织旗袍，温柔日常，适合轻复古街拍。',
    desc: '暖驼色无袖针织旗袍，色调柔和，风格更日常，适合轻熟、自然的复古照片。',
    tags: ['旗袍', '针织', '日常'],
    styleTips: [
      '适合咖啡馆、街景、旅拍和轻熟风个人照，整体不要搭配得太隆重。',
      '棕色手包、低跟鞋和小耳饰更能突出日常高级感。',
      '针织修身款建议确认腰腹和臀围余量，避免过紧影响站姿。'
    ]
  },
  10: {
    name: '墨绿丝绒短袖旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '墨绿色',
    silhouette: '短袖修身长款，传统立领盘扣',
    material: '丝绒质感厚润，光泽低调，显复古贵气',
    scene: '民国写真、室内棚拍、复古街景、轻晚宴',
    pairing: '适合搭配珍珠耳饰、黑色高跟鞋和小手包',
    note: '丝绒面料视觉厚重，夏季户外拍摄需考虑温度',
    subtitle: '墨绿丝绒短袖旗袍，复古显白，适合精致民国风。',
    desc: '墨绿色丝绒短袖旗袍，质感浓郁，立领盘扣强化传统韵味，适合复古主题拍摄。',
    tags: ['旗袍', '丝绒', '复古'],
    styleTips: [
      '适合民国风棚拍、复古街景、晚宴感造型和个人写真。',
      '珍珠耳饰、黑色高跟鞋和小手包能强化贵气感，背景宜简洁。',
      '丝绒款偏厚，夏季户外拍摄要提前确认舒适度。'
    ]
  },
  11: {
    name: '浅紫立领针织旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '浅紫色',
    silhouette: '立领修身中长款，线条柔和',
    material: '针织感面料柔软，色彩清雅',
    scene: '温柔系写真、花园外景、日常复古、闺蜜照',
    pairing: '适合浅色鞋包、珍珠耳饰和柔和妆容',
    note: '浅紫色对妆发和肤色要求较高，建议选择干净淡妆',
    subtitle: '浅紫立领针织旗袍，清雅温柔，适合柔光人像。',
    desc: '浅紫色立领针织旗袍，气质温柔清雅，适合花园、街景和轻复古人像。',
    tags: ['旗袍', '浅紫', '温柔'],
    styleTips: [
      '适合花园、街景和柔光棚拍，整体风格偏温柔清雅。',
      '建议搭配浅色鞋包和珍珠小耳饰，妆容以干净淡妆为主。',
      '浅色修身款建议确认内搭颜色和腰腹余量，避免透色或紧绷。'
    ]
  },
  12: {
    name: '烟灰立领修身旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '烟灰色',
    silhouette: '短袖立领长款，修身显线条',
    material: '哑光细纹面料，质感沉稳',
    scene: '复古街景、职业形象照、民国风棚拍、日常雅致造型',
    pairing: '适合搭配深色手包、珍珠耳饰和低饱和妆容',
    note: '灰色较克制，建议用耳饰或口红增加气色',
    subtitle: '烟灰色立领修身旗袍，克制雅致，适合沉稳复古造型。',
    desc: '烟灰色立领旗袍，线条干净，风格沉稳，适合更内敛的复古人像与形象照。',
    tags: ['旗袍', '烟灰', '雅致'],
    styleTips: [
      '适合职业感人像、复古街景和安静雅致的民国风拍摄。',
      '建议用珍珠耳饰、深色手包或红唇提升气色，避免整体过灰。',
      '修身款建议确认腰臀围，坐姿拍摄时要留出活动余量。'
    ]
  },
  13: {
    name: '黑色蕾丝立领旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '黑色',
    silhouette: '短袖立领修身长款，线条成熟',
    material: '蕾丝纹理精致，黑色显瘦且有戏剧感',
    scene: '复古夜景、民国棚拍、轻晚宴、个人写真',
    pairing: '适合珍珠耳饰、黑色高跟鞋和红唇妆容',
    note: '黑色蕾丝适合成熟风格，拍摄需注意补光避免细节发闷',
    subtitle: '黑色蕾丝立领旗袍，精致显瘦，适合成熟复古写真。',
    desc: '黑色蕾丝立领旗袍，纹理细腻，气质成熟，适合更有戏剧感的复古人像。',
    tags: ['旗袍', '蕾丝', '成熟'],
    styleTips: [
      '适合民国棚拍、复古夜景和轻晚宴感照片，氛围可以更浓郁。',
      '珍珠耳饰、红唇和黑色高跟鞋会让整体更完整。',
      '黑色细节需要充足光线，拍摄时建议避免背景过暗。'
    ]
  },
  14: {
    name: '米白花卉印花旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '米白底花卉印花',
    silhouette: '短袖中长款，修身但气质柔和',
    material: '印花面料清新，整体轻盈',
    scene: '春夏写真、花园外景、民国街景、日常旅拍',
    pairing: '适合浅色鞋包、草编包、珍珠耳饰或小团扇',
    note: '印花款建议背景不要太花，避免画面杂乱',
    subtitle: '米白花卉印花旗袍，清新温柔，适合春夏外景。',
    desc: '米白底花卉印花旗袍，画面清爽，适合花园、街景和温柔系复古照片。',
    tags: ['旗袍', '印花', '清新'],
    styleTips: [
      '适合春夏外景、花园、街区和温柔系民国写真。',
      '浅色鞋包、草编包或小团扇都适合，背景建议简洁。',
      '印花款不宜再叠加复杂配饰，避免画面过满。'
    ]
  },
  15: {
    name: '米白竖条立领旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '米白竖条',
    silhouette: '短袖立领中长款，竖向线条显修长',
    material: '细条纹面料清爽，视觉干净',
    scene: '日常复古、街景旅拍、文艺写真、轻正式活动',
    pairing: '适合白色或米色鞋包，配件保持简洁',
    note: '浅色条纹容易显身形，建议确认胸腰臀围是否合适',
    subtitle: '米白竖条立领旗袍，清爽显修长，适合文艺街拍。',
    desc: '米白竖条立领旗袍，竖向纹理拉长比例，适合干净、文艺的复古造型。',
    tags: ['旗袍', '条纹', '文艺'],
    styleTips: [
      '适合街景旅拍、文艺写真和轻正式活动，画面干净耐看。',
      '建议搭配米白鞋包和小耳饰，不需要太强烈的配件。',
      '浅色修身款建议提前确认胸腰臀围，内搭颜色也要尽量接近肤色或浅色。'
    ]
  },
  16: {
    name: '深灰短袖修身旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '深灰色',
    silhouette: '短袖修身中长款，线条简洁',
    material: '哑光面料低调耐看，质感沉稳',
    scene: '民国街景、职业感写真、复古棚拍、日常雅致造型',
    pairing: '适合黑色手包、珍珠耳饰和深色低跟鞋',
    note: '深灰色较成熟，建议用妆容和耳饰提升亮点',
    subtitle: '深灰短袖修身旗袍，低调显瘦，适合成熟雅致造型。',
    desc: '深灰短袖旗袍，配色克制，线条简洁，适合成熟、沉稳的复古人像。',
    tags: ['旗袍', '深灰', '显瘦'],
    styleTips: [
      '适合成熟风格、职业感人像和民国街景，成片会比较稳重。',
      '建议用珍珠耳饰、深色手包或红唇增加亮点。',
      '深色修身款需要确认肩胸和腰臀尺寸，避免紧绷影响线条。'
    ]
  },
  17: {
    name: '女童浅蓝纱裙套装',
    category: 'tongzhuang',
    categoryName: '女童',
    color: '浅蓝与白色',
    silhouette: '无袖上衣配蓬纱裙，轻盈甜美',
    material: '纱裙轻薄，整体有童话感',
    scene: '儿童写真、生日照、亲子照、花园外景',
    pairing: '适合白色小皮鞋、发箍、蝴蝶结或小团扇',
    note: '纱裙蓬度明显，拍摄前需整理裙摆并确认孩子活动舒适度',
    subtitle: '浅蓝女童纱裙套装，轻盈甜美，适合儿童写真。',
    desc: '浅蓝与白色组合的女童纱裙套装，画面清新甜美，适合生日、亲子和花园外景。',
    tags: ['女童', '纱裙', '甜美'],
    styleTips: [
      '适合生日照、亲子照、花园外景和儿童主题写真。',
      '白色小皮鞋、发箍或蝴蝶结会让造型更完整，配件宜轻巧。',
      '纱裙拍摄前要整理裙摆，确认孩子走动和坐下都舒适。'
    ]
  },
  18: {
    name: '女童粉色旗袍纱裙',
    category: 'tongzhuang',
    categoryName: '女童',
    color: '粉色与白色',
    silhouette: '粉色旗袍式上衣配白色蓬裙，甜美俏皮',
    material: '上衣带中式细节，纱裙柔软轻盈',
    scene: '儿童写真、节日活动、亲子照、生日照',
    pairing: '适合白色鞋袜、粉色发饰和小团扇',
    note: '浅粉色适合柔和背景，拍摄前注意裙摆和袖口整洁',
    subtitle: '粉色女童旗袍纱裙，甜美可爱，适合节日儿童照。',
    desc: '粉色旗袍式上衣搭配白色纱裙，甜美又有中式细节，适合女童主题写真。',
    tags: ['女童', '粉色', '中式'],
    styleTips: [
      '适合节日儿童照、生日照、亲子照和中式主题活动。',
      '建议搭配粉色发饰、白色鞋袜和小团扇，整体会更童趣。',
      '下单前确认胸围、裙长和孩子活动舒适度，浅色款需注意保持干净。'
    ]
  },
  19: {
    name: '女童白色公主纱裙',
    category: 'tongzhuang',
    categoryName: '女童',
    color: '象牙白',
    silhouette: '蓬蓬纱裙，裙摆层次明显',
    material: '多层纱感轻盈，拍照有公主感',
    scene: '儿童写真、生日照、花童、亲子纪念照',
    pairing: '适合白色皮鞋、珍珠发夹、花束或小手包',
    note: '白色纱裙容易显脏，户外拍摄建议提前安排换装顺序',
    subtitle: '象牙白女童公主纱裙，蓬松梦幻，适合生日与花童造型。',
    desc: '象牙白女童公主纱裙，裙摆蓬松，画面梦幻，适合儿童生日、花童和亲子纪念照。',
    tags: ['女童', '纱裙', '花童'],
    styleTips: [
      '适合生日、花童、亲子纪念照和梦幻儿童写真。',
      '珍珠发夹、花束和白色皮鞋很搭，背景选浅色或花园更好看。',
      '白色纱裙拍摄前后要注意清洁，户外建议减少坐地动作。'
    ]
  },
  20: {
    name: '黑色丝绒长旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '黑色',
    silhouette: '长款修身，立领盘扣，线条端庄',
    material: '丝绒质感厚润，黑色显瘦且高级',
    scene: '民国棚拍、复古晚宴、老洋房、个人写真',
    pairing: '适合珍珠耳饰、黑色手包、红唇和低盘发',
    note: '黑色丝绒需要较好补光，避免细节被暗部吞掉',
    subtitle: '黑色丝绒长旗袍，端庄显瘦，适合复古晚宴感照片。',
    desc: '黑色丝绒长旗袍，质感厚润，气质端庄，适合民国棚拍和轻晚宴主题。',
    tags: ['旗袍', '丝绒', '端庄'],
    styleTips: [
      '适合老洋房、民国棚拍、复古晚宴和个人形象照。',
      '珍珠耳饰、红唇、低盘发和黑色手包能强化高级感。',
      '黑色丝绒拍摄时要注意补光，避免纹理和盘扣细节不明显。'
    ]
  },
  21: {
    name: '黑色上衣棕色长裙套装',
    category: 'hanfu',
    categoryName: '新中式',
    color: '黑色上衣搭配棕色长裙',
    silhouette: '短袖上衣配高腰长裙，复古学院感',
    material: '上衣简洁，裙摆垂感好，色彩沉稳',
    scene: '民国风写真、文艺街拍、书店、咖啡馆、秋冬旅拍',
    pairing: '适合黑色皮鞋、复古手包、珍珠耳饰或贝雷帽',
    note: '深色上衣搭配长裙偏成熟，建议用发型和妆容增加轻盈感',
    subtitle: '黑色上衣配棕色长裙，文艺复古，适合秋冬民国风。',
    desc: '黑色短袖上衣搭配棕色高腰长裙，复古文艺感强，适合街景和室内场景。',
    tags: ['新中式', '长裙', '文艺'],
    styleTips: [
      '适合书店、咖啡馆、老街和秋冬旅拍，氛围偏文艺复古。',
      '建议搭配黑色皮鞋、复古手包和珍珠耳饰，造型会更完整。',
      '长裙需确认腰围和裙长，深色套装拍摄时可用浅色背景提亮。'
    ]
  },
  22: {
    name: '粉白飘带长裙套装',
    category: 'hanfu',
    categoryName: '新中式',
    color: '粉白色',
    silhouette: '白色短袖上衣配粉色长裙，飘带强调腰线',
    material: '轻薄上衣与柔和长裙组合，画面清甜',
    scene: '春夏外景、花园写真、温柔系旅拍、闺蜜照',
    pairing: '适合浅色高跟鞋、珍珠耳饰、小花束或浅色手包',
    note: '粉白色适合明亮环境，深色背景可能削弱清甜感',
    subtitle: '粉白飘带长裙套装，清甜温柔，适合春夏外景。',
    desc: '粉白色飘带长裙套装，色彩柔和，适合温柔系写真、花园外景和闺蜜照。',
    tags: ['新中式', '粉白', '温柔'],
    styleTips: [
      '适合花园、春夏外景、闺蜜照和温柔系旅拍。',
      '浅色鞋包、珍珠耳饰和小花束会增强清甜感。',
      '浅色长裙建议确认裙长和内搭颜色，避免透色或拖地。'
    ]
  },
  23: {
    name: '雾蓝上衣米白长裙套装',
    category: 'hanfu',
    categoryName: '新中式',
    color: '雾蓝与米白',
    silhouette: '短袖上衣配高腰长裙，线条柔和显高',
    material: '上衣清爽，长裙垂坠自然',
    scene: '文艺写真、民国街景、日常旅拍、室内清新主题',
    pairing: '适合白色或银色鞋包、珍珠耳饰和低盘发',
    note: '浅色裙装建议注意坐姿和台阶，保持裙摆整洁',
    subtitle: '雾蓝上衣配米白长裙，清新柔和，适合文艺旅拍。',
    desc: '雾蓝短袖上衣搭配米白长裙，清爽温柔，适合文艺、日常和轻复古照片。',
    tags: ['新中式', '雾蓝', '清新'],
    styleTips: [
      '适合文艺旅拍、街景、室内清新主题和轻复古写真。',
      '白色或银色鞋包、珍珠耳饰会让整体更干净。',
      '米白长裙拍摄时注意台阶和坐姿，避免裙摆蹭脏。'
    ]
  },
  24: {
    name: '米白垂坠长裙套装',
    category: 'hanfu',
    categoryName: '新中式',
    color: '米白色',
    silhouette: '连贯长线条，裙摆垂坠感强，气质优雅',
    material: '轻薄柔和面料，视觉干净，有飘逸感',
    scene: '高级感写真、婚礼迎宾、旅拍、民国风清雅造型',
    pairing: '适合珍珠耳饰、浅色高跟鞋、手捧花或小包',
    note: '整体浅色且长款，需确认身高、鞋跟高度和使用场地',
    subtitle: '米白垂坠长裙套装，干净优雅，适合清雅高级感写真。',
    desc: '米白色长裙套装，线条舒展，气质清雅，适合高级感人像和温柔旅拍。',
    tags: ['新中式', '米白', '优雅'],
    styleTips: [
      '适合清雅高级感写真、旅拍、婚礼迎宾和民国风柔和造型。',
      '建议搭配珍珠耳饰、浅色高跟鞋或手捧花，整体保持干净。',
      '长款浅色衣裙需确认身高和鞋跟高度，户外拍摄要注意裙摆清洁。'
    ]
  },
  25: {
    name: '黑色珍珠领丝绒旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '黑色',
    silhouette: '短袖修身长款，珍珠领口增强精致感',
    material: '丝绒质感浓郁，珍珠装饰提升华丽度',
    scene: '民国棚拍、复古晚宴、老洋房、精致个人写真',
    pairing: '适合珍珠耳饰、黑色手包、红唇和低盘发',
    note: '领口装饰较醒目，项链可省略，避免配饰堆叠',
    subtitle: '黑色珍珠领丝绒旗袍，华丽精致，适合高贵复古造型。',
    desc: '黑色丝绒旗袍带珍珠领口装饰，复古华丽，适合精致、成熟的民国风照片。',
    tags: ['旗袍', '珍珠', '华丽'],
    styleTips: [
      '适合老洋房、棚拍、复古晚宴和精致个人写真。',
      '珍珠领口已经足够醒目，建议耳饰简洁，项链可以省略。',
      '黑色丝绒拍摄需要补光，确认胸腰臀围以保证线条顺。'
    ]
  },
  26: {
    name: '白色上衣薄荷绿纱裙',
    category: 'hanfu',
    categoryName: '新中式',
    color: '白色与薄荷绿',
    silhouette: '短袖上衣配轻盈长纱裙，清新显高',
    material: '上衣简洁，纱裙轻柔，有春夏感',
    scene: '花园外景、春夏旅拍、文艺写真、闺蜜照',
    pairing: '适合浅色鞋包、珍珠耳饰、草编包或小花束',
    note: '纱裙层次轻薄，户外拍摄需注意风和裙摆整理',
    subtitle: '白色上衣配薄荷绿纱裙，清新自然，适合春夏旅拍。',
    desc: '白色上衣搭配薄荷绿纱裙，清新轻盈，适合花园、街景和春夏文艺写真。',
    tags: ['新中式', '纱裙', '清新'],
    styleTips: [
      '适合春夏旅拍、花园外景、闺蜜照和清新文艺照片。',
      '浅色鞋包、草编包或小花束都很搭，配饰不要太重。',
      '纱裙拍摄前需整理层次，户外有风时注意裙摆状态。'
    ]
  },
  27: {
    name: '女童红色短袖旗袍裙',
    category: 'tongzhuang',
    categoryName: '女童',
    color: '正红色',
    silhouette: '短袖中式旗袍裙，长度轻便，儿童感明显',
    material: '红色面料醒目，适合节日氛围',
    scene: '春节、生日、儿童写真、亲子照、节日活动',
    pairing: '适合白色袜子、小皮鞋、发饰或小灯笼道具',
    note: '红色饱和度高，背景宜简洁，避免颜色过乱',
    subtitle: '女童红色短袖旗袍裙，喜庆醒目，适合节日儿童照。',
    desc: '正红色女童短袖旗袍裙，明亮活泼，适合春节、生日和节日主题儿童写真。',
    tags: ['女童', '红色', '节日'],
    styleTips: [
      '适合春节、生日、儿童节和亲子节日照，画面喜庆醒目。',
      '建议搭配白色鞋袜和简单发饰，背景不要太花。',
      '下单前确认裙长和胸腰围，儿童拍摄要保证跑跳舒适。'
    ]
  },
  28: {
    name: '黑色短袖修身旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '黑色',
    silhouette: '短袖修身中长款，线条干练',
    material: '哑光黑色面料，低调显瘦',
    scene: '民国街景、个人写真、复古棚拍、轻正式活动',
    pairing: '适合黑色高跟鞋、复古手包和红唇妆容',
    note: '纯黑款需要用配饰或妆容制造亮点，拍摄时注意补光',
    subtitle: '黑色短袖修身旗袍，简洁显瘦，适合干练复古造型。',
    desc: '黑色短袖修身旗袍，版型简洁，气质干练，适合复古街景和个人写真。',
    tags: ['旗袍', '黑色', '干练'],
    styleTips: [
      '适合民国街景、复古棚拍和轻正式活动，风格偏干练成熟。',
      '建议用红唇、耳饰或手包增加亮点，避免全身过暗。',
      '黑色修身款需确认腰臀围，拍摄时注意光线保留面料层次。'
    ]
  },
  29: {
    name: '浅绿色蕾丝旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '浅绿色',
    silhouette: '无袖修身中长款，线条温婉',
    material: '蕾丝纹理细腻，浅绿显清雅',
    scene: '花园写真、民国街景、春夏活动、温柔系人像',
    pairing: '适合珍珠耳饰、浅色手包和米色高跟鞋',
    note: '浅绿蕾丝适合明亮环境，背景过暗会削弱清新感',
    subtitle: '浅绿色蕾丝旗袍，清雅温婉，适合春夏复古写真。',
    desc: '浅绿色蕾丝旗袍，纹理细腻，气质清雅，适合春夏外景和温柔民国风。',
    tags: ['旗袍', '蕾丝', '清雅'],
    styleTips: [
      '适合花园、街景、春夏活动和温柔系个人写真。',
      '珍珠耳饰、浅色手包和米色高跟鞋会让整体更柔和。',
      '蕾丝面料建议避免复杂背景，突出纹理和人物气质。'
    ]
  },
  30: {
    name: '藏蓝印花长旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '藏蓝色',
    silhouette: '长款修身，传统感强，显端庄',
    material: '深色印花面料，纹样含蓄，质感沉稳',
    scene: '民国街景、老洋房、正式活动、复古写真',
    pairing: '适合珍珠耳饰、深色高跟鞋和小手包',
    note: '深色长款适合成熟气质，拍摄需保证面部和衣纹光线',
    subtitle: '藏蓝印花长旗袍，沉稳端庄，适合成熟复古造型。',
    desc: '藏蓝印花长旗袍，色调沉稳，线条端庄，适合老洋房和民国街景拍摄。',
    tags: ['旗袍', '藏蓝', '端庄'],
    styleTips: [
      '适合老洋房、民国街景、正式活动和成熟风格写真。',
      '珍珠耳饰、深色高跟鞋和小手包能强化端庄感。',
      '深色印花款拍摄时注意补光，避免纹样细节不明显。'
    ]
  },
  31: {
    name: '裸粉蕾丝修身旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '裸粉色',
    silhouette: '无袖修身长款，柔和显身形',
    material: '蕾丝纹理柔美，裸粉色温柔细腻',
    scene: '花园写真、闺蜜照、温柔系个人照、春夏外景',
    pairing: '适合珍珠耳饰、米色高跟鞋和浅色手包',
    note: '裸粉色贴肤，建议确认内搭颜色和面料透感',
    subtitle: '裸粉蕾丝修身旗袍，温柔细腻，适合春夏人像。',
    desc: '裸粉色蕾丝旗袍，柔和精致，适合温柔系写真、花园外景和闺蜜照。',
    tags: ['旗袍', '裸粉', '蕾丝'],
    styleTips: [
      '适合花园外景、温柔系个人照和闺蜜照，画面会比较柔和。',
      '珍珠耳饰、米色高跟鞋和浅色手包更协调。',
      '裸粉修身款建议确认内搭颜色、胸腰臀围和面料透感。'
    ]
  },
  32: {
    name: '姜黄色无袖印花旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '姜黄色',
    silhouette: '无袖修身长款，色彩明亮',
    material: '印花面料复古醒目，暖色调上镜',
    scene: '秋日写真、民国街景、复古旅拍、轻晚宴',
    pairing: '适合金色耳饰、米色手包和暖色妆容',
    note: '姜黄色存在感强，背景宜选低饱和砖墙、木色或米色',
    subtitle: '姜黄色无袖印花旗袍，明亮复古，适合秋日街景。',
    desc: '姜黄色无袖印花旗袍，色彩明亮，复古感强，适合街景和秋日主题写真。',
    tags: ['旗袍', '姜黄', '醒目'],
    styleTips: [
      '适合秋日街景、砖墙背景、复古旅拍和轻晚宴感照片。',
      '金色耳饰、米色手包和暖色妆容能呼应衣服色调。',
      '亮色旗袍背景不要太花，避免和服装抢视觉重点。'
    ]
  },
  33: {
    name: '白衬衫红色刺绣马面裙',
    category: 'qipao',
    categoryName: '马面裙',
    color: '白色上衣搭配红色刺绣裙',
    silhouette: '短上衣配高腰马面裙，比例鲜明',
    material: '白衬衫清爽，红色刺绣裙摆细节丰富',
    scene: '新中式写真、节日活动、国风街拍、园林外景',
    pairing: '适合红色或金色配饰、发簪、绣鞋或小手包',
    note: '红色裙摆视觉重点强，上衣和配饰保持简洁更耐看',
    subtitle: '白衬衫配红色刺绣马面裙，明艳国风，适合节日写真。',
    desc: '白色上衣搭配红色刺绣马面裙，色彩明艳，国风感强，适合节日和新中式主题。',
    tags: ['马面裙', '刺绣', '明艳'],
    styleTips: [
      '适合新中式写真、节日活动、园林外景和国风街拍。',
      '发簪、绣鞋、小手包或金色耳饰都能提升完整度。',
      '红色裙摆已经很醒目，上衣和背景建议简洁，避免画面过满。'
    ]
  },
  34: {
    name: '米白简约修身旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '米白色',
    silhouette: '短袖修身中长款，线条干净',
    material: '哑光浅色面料，简洁耐看',
    scene: '清雅写真、民国街景、轻婚礼造型、日常复古',
    pairing: '适合珍珠耳饰、浅色高跟鞋和精致手包',
    note: '米白色容易显脏，拍摄前需注意衣身平整和清洁',
    subtitle: '米白简约修身旗袍，干净雅致，适合清爽高级感照片。',
    desc: '米白色修身旗袍，版型简洁，气质干净，适合清雅、高级感的复古人像。',
    tags: ['旗袍', '米白', '简约'],
    styleTips: [
      '适合清雅写真、民国街景、轻婚礼造型和日常复古照片。',
      '珍珠耳饰和浅色鞋包最稳，配饰保持精致简洁。',
      '浅色旗袍需注意清洁和平整，建议确认内搭颜色。'
    ]
  },
  35: {
    name: '米白无袖开衩旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '米白色',
    silhouette: '无袖修身长款，侧开衩，线条优雅',
    material: '浅色面料细腻，整体清爽高级',
    scene: '高级感写真、民国街景、轻晚宴、个人形象照',
    pairing: '适合珍珠耳饰、米色高跟鞋和小手包',
    note: '无袖开衩款对肩颈、腰臀和行走姿态要求较高',
    subtitle: '米白无袖开衩旗袍，清爽高级，适合精致个人写真。',
    desc: '米白无袖开衩旗袍，线条修长，气质清爽高级，适合精致复古人像。',
    tags: ['旗袍', '无袖', '高级'],
    styleTips: [
      '适合高级感写真、轻晚宴、民国街景和个人形象照。',
      '珍珠耳饰、米色高跟鞋和小手包能保持清爽贵气。',
      '无袖开衩款建议确认肩颈状态、腰臀围和行走舒适度。'
    ]
  },
  36: {
    name: '橄榄绿提花无袖旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '橄榄绿',
    silhouette: '无袖修身长款，轮廓成熟优雅',
    material: '提花纹理低调，色调复古沉稳',
    scene: '民国街景、老洋房、复古写真、轻正式活动',
    pairing: '适合金色耳饰、深色手包和复古红唇',
    note: '无袖修身款需确认胸腰臀围，避免过紧影响站姿',
    subtitle: '橄榄绿提花无袖旗袍，复古沉稳，适合成熟高级造型。',
    desc: '橄榄绿提花无袖旗袍，纹理低调，色彩沉稳，适合成熟高级的复古照片。',
    tags: ['旗袍', '提花', '沉稳'],
    styleTips: [
      '适合老洋房、民国街景和轻正式活动，气质偏成熟高级。',
      '金色耳饰、深色手包和复古红唇能提升画面层次。',
      '修身无袖款建议重点确认胸腰臀围和肩颈状态。'
    ]
  },
  37: {
    name: '雾蓝短袖针织旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '雾蓝色',
    silhouette: '短袖修身中长款，线条柔和',
    material: '针织感面料柔软，色调安静',
    scene: '日常复古、街景旅拍、文艺写真、轻熟风形象照',
    pairing: '适合浅色手包、低跟鞋和珍珠小耳饰',
    note: '针织款贴身，建议确认腰腹和臀围余量',
    subtitle: '雾蓝短袖针织旗袍，安静柔和，适合日常复古写真。',
    desc: '雾蓝色短袖针织旗袍，色调温柔安静，适合日常复古、街景和文艺人像。',
    tags: ['旗袍', '雾蓝', '针织'],
    styleTips: [
      '适合街景旅拍、日常复古和轻熟风个人照。',
      '浅色手包、低跟鞋和小耳饰更符合这件的安静气质。',
      '针织修身款建议确认腰腹和臀围余量，避免过紧显褶。'
    ]
  },
  38: {
    name: '藏蓝金线刺绣旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '藏蓝色',
    silhouette: '无袖修身长款，比例修长，气质冷艳',
    material: '深色面料带金线刺绣，精致且有光泽层次',
    scene: '民国街景、老洋房、复古晚宴、高级个人写真',
    pairing: '适合珍珠耳饰、黑色高跟鞋、金色小包或手拿包',
    note: '这件并不是黄色条纹款，深色刺绣需要较好光线呈现细节',
    subtitle: '藏蓝金线刺绣旗袍，精致冷艳，适合高级复古人像。',
    desc: '藏蓝色金线刺绣旗袍，线条修长，细节精致，适合老洋房与民国街景的高级感拍摄。',
    tags: ['旗袍', '刺绣', '高级'],
    styleTips: [
      '适合老洋房、民国街景、复古晚宴和高级感个人写真。',
      '珍珠耳饰、黑色高跟鞋或金色小包会呼应刺绣质感。',
      '深色刺绣款需要充足光线，拍摄前确认胸腰臀围和开衩活动度。'
    ]
  },
  39: {
    name: '浅蓝短款旗袍裙',
    category: 'qipao',
    categoryName: '旗袍',
    color: '浅蓝色',
    silhouette: '短款修身，轻便显腿长',
    material: '浅色面料清爽，整体年轻俏皮',
    scene: '春夏街拍、轻复古写真、约会感人像、闺蜜照',
    pairing: '适合浅色小包、低跟鞋或玛丽珍鞋，配件宜轻巧',
    note: '短款更适合年轻活泼风格，正式场合需确认长度是否合适',
    subtitle: '浅蓝短款旗袍裙，清爽俏皮，适合春夏轻复古照片。',
    desc: '浅蓝短款旗袍裙，清爽年轻，适合春夏街拍、闺蜜照和轻复古主题。',
    tags: ['旗袍', '短款', '清爽'],
    styleTips: [
      '适合春夏街拍、闺蜜照、轻复古写真和约会感人像。',
      '浅色小包、玛丽珍鞋或低跟鞋会让整体更轻盈。',
      '短款旗袍裙需确认裙长和活动需求，正式场合建议提前沟通。'
    ]
  },
  40: {
    name: '米白短袖修身旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '米白色',
    silhouette: '短袖修身中长款，简洁温婉',
    material: '浅色面料柔和，视觉干净',
    scene: '清雅写真、民国街景、温柔系旅拍、轻正式活动',
    pairing: '适合珍珠耳饰、浅色鞋包和柔和妆容',
    note: '浅色修身款建议确认内搭颜色和衣身平整度',
    subtitle: '米白短袖修身旗袍，温婉干净，适合清雅复古人像。',
    desc: '米白短袖修身旗袍，简洁温婉，适合清雅、干净的民国风照片。',
    tags: ['旗袍', '米白', '温婉'],
    styleTips: [
      '适合清雅写真、温柔系旅拍和轻正式活动，画面干净耐看。',
      '珍珠耳饰、浅色鞋包和柔和妆容最稳，不宜搭配过重配饰。',
      '浅色款需要确认内搭颜色、胸腰臀围和衣身平整度。'
    ]
  },
  41: {
    name: '浅绿短袖修身旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '浅绿色',
    silhouette: '短袖修身长款，清雅显身形',
    material: '浅绿面料细腻，复古但不沉重',
    scene: '花园写真、民国街景、春夏活动、温柔系人像',
    pairing: '适合珍珠耳饰、米色鞋包和自然盘发',
    note: '浅绿适合明亮背景，暗背景会显得不够清透',
    subtitle: '浅绿短袖修身旗袍，清雅自然，适合春夏复古写真。',
    desc: '浅绿色短袖修身旗袍，色调清雅，适合春夏外景和温柔复古造型。',
    tags: ['旗袍', '浅绿', '清雅'],
    styleTips: [
      '适合花园、街景、春夏活动和温柔系个人写真。',
      '珍珠耳饰、米色鞋包和自然盘发会让气质更清雅。',
      '建议选择明亮背景，避免暗背景削弱浅绿色的清透感。'
    ]
  },
  42: {
    name: '黄绿色无袖修身旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '黄绿色',
    silhouette: '无袖修身长款，色彩明快',
    material: '细腻面料带轻微光泽，画面有活力',
    scene: '春夏旅拍、街景写真、轻晚宴、个人形象照',
    pairing: '适合金色耳饰、米色高跟鞋和浅色手包',
    note: '黄绿色比较挑肤色，建议搭配干净底妆和暖色口红',
    subtitle: '黄绿色无袖修身旗袍，明快醒目，适合春夏旅拍。',
    desc: '黄绿色无袖修身旗袍，颜色明快，上镜醒目，适合春夏街景和旅拍。',
    tags: ['旗袍', '黄绿', '明快'],
    styleTips: [
      '适合春夏旅拍、街景写真和轻晚宴，画面会比较明亮。',
      '金色耳饰、米色高跟鞋和浅色手包能呼应暖色调。',
      '黄绿色较挑肤色，建议搭配干净底妆和暖色口红。'
    ]
  },
  43: {
    name: '酒红短袖刺绣旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '酒红色',
    silhouette: '短袖修身长款，传统立领，气质浓郁',
    material: '酒红提花刺绣面料，光泽克制，复古感强',
    scene: '民国街景、老洋房、复古晚宴、个人写真',
    pairing: '适合黑色手包、珍珠耳饰、深色高跟鞋和复古红唇',
    note: '这件并不是金色旗袍，酒红色更适合成熟复古风格',
    subtitle: '酒红短袖刺绣旗袍，浓郁复古，适合民国街景人像。',
    desc: '酒红色短袖刺绣旗袍，色彩浓郁，线条修身，适合老洋房和复古街景拍摄。',
    tags: ['旗袍', '酒红', '刺绣'],
    styleTips: [
      '适合民国街景、老洋房、复古晚宴和成熟感个人写真。',
      '黑色手包、珍珠耳饰、深色高跟鞋和红唇会很协调。',
      '酒红修身款建议确认胸腰臀围，拍摄时可选择暖光或砖墙背景。'
    ]
  },
  44: {
    name: '青绿无袖修身旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '青绿色',
    silhouette: '无袖修身长款，线条清爽',
    material: '面料细腻，颜色清新但有复古感',
    scene: '春夏街景、民国写真、花园外景、轻正式活动',
    pairing: '适合珍珠耳饰、浅色手包和米色高跟鞋',
    note: '无袖款建议确认肩颈状态，浅绿色背景宜简洁',
    subtitle: '青绿无袖修身旗袍，清新复古，适合春夏民国风。',
    desc: '青绿色无袖修身旗袍，清爽又有复古气质，适合春夏街景与花园外景。',
    tags: ['旗袍', '青绿', '清新'],
    styleTips: [
      '适合春夏街景、花园外景和清新民国风人像。',
      '珍珠耳饰、浅色手包和米色高跟鞋能保持干净质感。',
      '无袖修身款建议确认肩颈、胸腰臀围和使用场景温度。'
    ]
  },
  45: {
    name: '米白花卉印花旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '米白底浅色花卉',
    silhouette: '短袖修身中长款，温柔雅致',
    material: '浅色印花面料，细节柔和',
    scene: '花园写真、民国街景、温柔系旅拍、闺蜜照',
    pairing: '适合浅色鞋包、珍珠耳饰和手捧花',
    note: '浅色印花适合简洁背景，配饰不宜过多',
    subtitle: '米白花卉印花旗袍，温柔雅致，适合花园与街景写真。',
    desc: '米白花卉印花旗袍，画面柔和，适合温柔系人像、花园外景和民国街景。',
    tags: ['旗袍', '花卉', '温柔'],
    styleTips: [
      '适合花园外景、民国街景、闺蜜照和温柔系个人写真。',
      '浅色鞋包、珍珠耳饰和手捧花会让造型更完整。',
      '印花款建议背景简洁，避免花色和环境纹理互相抢画面。'
    ]
  },
  46: {
    name: '米黄碎花立领旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '米黄色碎花',
    silhouette: '无袖立领修身中长款，轻盈雅致',
    material: '碎花面料细腻，色调温暖',
    scene: '春夏写真、花园外景、民国街景、日常旅拍',
    pairing: '适合米色手包、浅色高跟鞋和珍珠耳饰',
    note: '碎花款适合自然光，过暗环境会损失清新感',
    subtitle: '米黄碎花立领旗袍，温暖清新，适合春夏外景。',
    desc: '米黄色碎花立领旗袍，细节温柔，适合春夏花园、街景和日常旅拍。',
    tags: ['旗袍', '碎花', '春夏'],
    styleTips: [
      '适合春夏外景、花园、街景和日常旅拍，整体风格轻盈温柔。',
      '米色手包、浅色高跟鞋和珍珠耳饰最协调。',
      '碎花款建议使用自然光，背景不要太复杂。'
    ]
  },
  47: {
    name: '柠檬黄无袖短旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '柠檬黄色',
    silhouette: '无袖短款，活泼显腿长',
    material: '浅黄色面料明快，风格年轻',
    scene: '春夏街拍、旅拍、闺蜜照、轻复古活动',
    pairing: '适合白色或米色鞋包，配珍珠小耳饰即可',
    note: '短款亮色更适合年轻活泼风格，正式场合需确认长度',
    subtitle: '柠檬黄无袖短旗袍，明亮俏皮，适合春夏街拍。',
    desc: '柠檬黄色无袖短旗袍，色彩明快，风格年轻，适合春夏街拍和轻复古照片。',
    tags: ['旗袍', '短款', '明亮'],
    styleTips: [
      '适合春夏街拍、旅拍、闺蜜照和轻复古活动，画面活泼明亮。',
      '白色或米色鞋包最清爽，配件保持轻巧即可。',
      '短款亮色旗袍需确认裙长和活动场合，避免正式场景不合适。'
    ]
  },
  48: {
    name: '黑底红花短袖旗袍',
    category: 'qipao',
    categoryName: '旗袍',
    color: '黑色底红色花卉',
    silhouette: '短袖修身中长款，复古感强',
    material: '深色印花面料，花卉图案醒目',
    scene: '民国街景、复古写真、老洋房、轻晚宴',
    pairing: '适合黑色高跟鞋、红唇、珍珠耳饰或深色手包',
    note: '黑底红花视觉重点强，背景和配饰应保持克制',
    subtitle: '黑底红花短袖旗袍，浓郁复古，适合民国街景写真。',
    desc: '黑底红花短袖旗袍，色彩对比强，复古氛围浓，适合民国街景和老洋房拍摄。',
    tags: ['旗袍', '黑红', '复古'],
    styleTips: [
      '适合民国街景、老洋房、复古写真和轻晚宴感照片。',
      '红唇、珍珠耳饰、黑色高跟鞋和深色手包能呼应整体色调。',
      '黑底红花已经很醒目，背景和配饰建议克制，避免画面过杂。'
    ]
  }
}

clothingList.forEach(item => {
  const meta = clothingMetadata[item.id]
  if (!meta) return

  Object.assign(item, {
    name: meta.name,
    category: meta.category,
    categoryName: meta.categoryName,
    subtitle: meta.subtitle,
    desc: meta.desc,
    detailDesc: buildDetailDesc(meta),
    tags: meta.tags,
    styleTips: meta.styleTips
  })
})

const homeDisplayOrder = [
  38, 43, 8, 20, 33, 7, 10, 48,
  25, 29, 24, 14, 32, 36, 41, 45, 46, 30,
  40, 31, 47, 22, 6, 9,
  11, 12, 13, 15, 16, 21, 23, 26,
  28, 34, 35, 37, 39, 42, 44,
  1, 2, 3, 4, 5, 17, 18, 19, 27
]

const homeDisplayRank = homeDisplayOrder.reduce((rank, id, index) => {
  rank[id] = index
  return rank
}, {})

function getHomeDisplayRank(item) {
  const id = parseInt(item.id)
  return Object.prototype.hasOwnProperty.call(homeDisplayRank, id)
    ? homeDisplayRank[id]
    : homeDisplayOrder.length + id
}

const homeClothingList = clothingList
  .slice()
  .sort((a, b) => getHomeDisplayRank(a) - getHomeDisplayRank(b))

const homeBanners = [38, 43, 10].map((id, index) => {
  const item = clothingList.find(clothing => clothing.id === id)
  return {
    id: index + 1,
    title: item.name,
    subtitle: item.categoryName,
    desc: item.subtitle,
    image: item.image,
    color: '#8B4513'
  }
})

module.exports = {
  categories,
  banners: homeBanners,
  clothingList: homeClothingList,
  getByCategory(categoryId) {
    if (categoryId === 'all') return homeClothingList
    return homeClothingList.filter(item => item.category === categoryId)
  },
  getById(id) {
    return clothingList.find(item => item.id === parseInt(id))
  }
}
