/*
 * @Author: czy0729
 * @Date: 2022-09-20 01:18:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-20 01:19:19
 */
import { DATA_ALPHABET } from '@constants/constants'
import { desc } from '../../utils'
import { ANIME_YEAR } from '../anime'

export const WENKU_FIRST = DATA_ALPHABET

export const WENKU_YEAR = ANIME_YEAR

export const WENKU_STATUS = ['连载', '完结'] as const

export const WENKU_ANIME = ['是', '否'] as const

export const WENKU_CATE = [
  '电击文库',
  'MF文库J',
  '角川文库',
  '富士见文库',
  'Fami通文库',
  '集英社',
  '讲谈社',
  'HJ文库',
  'GA文库',
  '小学馆',
  '少女文库',
  '一迅社',
  '游戏剧本',
  '其他文库'
] as const

export const WENKU_AUTHOR = [
  '西尾维新',
  '入间人间',
  '杉井光',
  '镰池和马',
  '榊一郎',
  '合作',
  '野村美月',
  '日日日',
  '田中芳树',
  '筑地俊彦',
  '有川浩',
  '五十岚雄策',
  '京极夏彦',
  '奈须蘑菇',
  '森见登美彦',
  '米泽穗信',
  '十文字青',
  '村崎幸也',
  '矢岛さら',
  '成田良悟',
  '细音启',
  '虚渊玄',
  '时雨泽惠一',
  '铃木大辅',
  '川口士',
  '森田季节',
  '朝野始',
  '望公太',
  '桥本纺',
  '三田诚',
  '樱庭一树',
  '本田透',
  '土桥真二郎',
  '甲田学人',
  '田尾典丈',
  '新木伸',
  '绫里惠史',
  '朝浦',
  '石田衣良',
  '犬村小六',
  '平坂读',
  '唐边叶介',
  '红玉伊月',
  '小野不由美',
  '上远野浩平',
  '舞阪洸',
  '竹冈叶月',
  '镜游',
  '石川博品',
  '柑橘ゆすら',
  '岬鹭宫',
  '三河ごーすと',
  '古宫九时',
  '天泽夏月'
] as const

export const WENKU_SORT = [
  '发行',
  '排名',
  '热度',
  '趋势',
  '更新',
  '随机',
  '名称'
] as const

export const WENKU_TAGS_MAP = {
  科幻: 329,
  悬疑: 373,
  冒险: 571,
  末日: 20,
  黑暗: 185,
  机战: 70,
  战争: 152,
  青春: 823,
  恋爱: 1032,
  穿越: 327,
  奇幻: 951,
  经营: 33,
  群像: 55,
  魔法: 258,
  战斗: 754,
  校园: 1034,
  欢乐向: 756,
  竞技: 23,
  女性视角: 261,
  百合: 125,
  犯罪: 77,
  异能: 147,
  旅行: 60,
  音乐: 60,
  复仇: 36,
  大逃杀: 26,
  后宫: 984,
  猎奇: 33,
  脑洞: 19,
  人外: 366,
  妹妹: 254,
  青梅竹马: 353
  // JC: 8,
  // 斗智: 52,
  // 大小姐: 80,
  // 治愈: 42,
  // 伪娘: 47,
  // 惊悚: 59,
  // 宅文化: 10,
  // JK: 25,
  // 耽美: 30,
  // 职场: 66,
  // 游戏: 35,
  // NTR: 17,
  // 性转: 30,
  // 美食: 24,
  // 间谍: 5,
  // 女儿: 22,
  // 龙傲天: 161
} as const

export const WENKU_TAGS = Object.keys(WENKU_TAGS_MAP).sort((a, b) =>
  desc(WENKU_TAGS_MAP[a], WENKU_TAGS_MAP[b])
)
