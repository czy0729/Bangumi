/*
 * @Author: czy0729
 * @Date: 2022-09-14 04:50:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-21 04:54:42
 */
import { asc, getTimestamp } from '@utils'
import { getPinYinFirstCharacter } from '@utils/thirdParty/pinyin'
import { DATA_ALPHABET } from '@constants/constants'

/** 预设排序 */
export const SORT = {
  // 上映时间
  begin(a = {}, b = {}, key = 'b') {
    return (
      (getTimestamp(b[key] || '0000-00-00') || 0) -
      (getTimestamp(a[key] || '0000-00-00') || 0)
    )
  },

  // 名称
  name(a = {}, b = {}, key = 'c') {
    return asc(
      String(getPinYinFirstCharacter(a[key] || '')),
      String(getPinYinFirstCharacter(b[key] || ''))
    )
  },

  // 评分或排名
  rating(a = {}, b = {}, keyScore = 's', keyRank = 'r') {
    const sA = a[keyScore] || 0
    const sB = b[keyScore] || 0
    const rA = a[keyRank] === undefined ? -10000 : 10000 - a[keyRank]
    const rB = b[keyRank] === undefined ? -10000 : 10000 - b[keyRank]
    return sB + rB - (sA + rA)
  },

  // 随机
  random() {
    return 0.5 - Math.random()
  },

  // 分数, 也可用于数值比较
  score(a = {}, b = {}, key = 's') {
    return Number(b[key] || 0) - Number(a[key] || 0)
  },

  // 评分人数
  total(a = {}, b = {}, key = 'l') {
    return Number(b[key] || 0) - Number(a[key] || 0)
  }
}

/** 只返回下标数组对象 */
export const REG_SEASONS = {
  '1月': /-(01|02|03|1|2|3)-/,
  '4月': /-(04|05|06|4|5|6)-/,
  '7月': /-(07|08|09|7|8|9)-/,
  '10月': /-(10|11|12)-/
} as const

export const ANIME_AREA = ['日本', '中国'] as const

export const ANIME_TYPE = ['TV', '剧场版', 'OVA', 'WEB'] as const

export const ANIME_FIRST = DATA_ALPHABET

export const ANIME_YEAR = [
  2023,
  2022,
  2021,
  2020,
  2019,
  2018,
  2017,
  2016,
  2015,
  2014,
  2013,
  2012,
  2011,
  2010,
  2009,
  2008,
  2007,
  2006,
  2005,
  2004,
  2003,
  2002,
  2001,
  '2000以前'
] as const

export const ANIME_BEGIN = ['1月', '4月', '7月', '10月'] as const

export const ANIME_STATUS = ['连载', '完结', '未播放'] as const

export const ANIME_TAGS = [
  '奇幻',
  '搞笑',
  '战斗',
  '校园',
  '冒险',
  '科幻',
  '治愈',
  '爱情',
  '百合',
  '后宫',
  '热血',
  '励志',
  '悬疑',
  '轻小说',
  '剧情',
  '竞技',
  '青春',
  '女性向',
  '泡面番',
  '机战',
  '萝莉',
  '神魔',
  '歌舞',
  '战争',
  '魔法',
  '社会',
  '运动',
  '玄幻',
  '美少女',
  '亲子',
  '历史',
  '职场',
  '犯罪',
  '游戏',
  '日常',
  '武侠',
  '恋爱',
  '耽美',
  '推理',
  '恐怖',
  '欢乐向',
  '血腥',
  '伪娘',
  '吸血鬼',
  '偶像',
  '穿越'
] as const

const ANIME_TAGS_MAP = {}
ANIME_TAGS.forEach((item, index) => {
  ANIME_TAGS_MAP[item] = index
})

export { ANIME_TAGS_MAP }

export const ANIME_OFFICIAL = [
  'J.C.STAFF',
  'A-1 Pictures',
  'MADHOUSE',
  '东映动画',
  'Production I.G',
  'Studio DEEN',
  'SUNRISE',
  'BONES',
  'SILVER LINK.',
  'SHAFT',
  'XEBEC',
  'LIDENFILMS',
  'TMS Entertainment',
  'OLM',
  '京都动画',
  'GONZO',
  '动画工房',
  'MAPPA',
  "Brain's Base",
  'スタジオディーン',
  'diomedéa',
  'feel.',
  '小丑社',
  'WIT STUDIO',
  'ZEXCS',
  '龙之子Production',
  'P.A.WORKS',
  'サンライズ',
  'Lerche',
  'BN Pictures',
  'WHITE FOX',
  '8bit',
  'Studio五组',
  'KINEMA CITRUS',
  'SATELIGHT',
  'CloverWorks',
  '绘梦',
  'ufotable',
  'project No.9',
  '玄机科技',
  'david production',
  'SANZIGEN',
  'SEVEN・ARCS',
  'ぴえろ',
  'AIC',
  'SHIN-EI动画',
  'Manglobe',
  'Hoods Entertainment',
  'TNK',
  '圆谷制作',
  '东映アニメーション',
  'GoHands',
  'Telecom Animation Film',
  'ZERO-G',
  'Seven Arcs',
  'Seven',
  'TYO Animations',
  'Passione',
  'GAINAX',
  '上海福煦影视文化投资有限公司',
  '索以文化',
  'ARTLAND',
  'ARMS',
  'Satelight',
  'Production IMS',
  'CONNECT',
  'C2C',
  '亜细亜堂',
  'NOMAD',
  'TRIGGER',
  'ILCA',
  '若鸿文化',
  'Bridge',
  'TROYCA',
  'Studio 3Hz',
  'Arms',
  'Hal Film Maker',
  'SynergySP',
  'Nippon Animation',
  '福煦影视',
  '中影年年',
  'Graphinica',
  'Lay-duce',
  '北京若森数字科技有限公司',
  'Creators in Pack',
  'PINE JAM',
  '幻维数码',
  'A・C・G・T',
  'asread',
  'AIC ASTA',
  'STUDIO 4℃',
  'C-Station',
  '大火鸟文化',
  'PPI',
  'AXsiZ',
  'Science SARU'
] as const

const ANIME_OFFICIAL_MAP = {}
ANIME_OFFICIAL.forEach((item, index) => {
  ANIME_OFFICIAL_MAP[item] = index
})

export { ANIME_OFFICIAL_MAP }

export const ANIME_SORT = ['排名', '上映时间', '评分人数', '随机', '名称'] as const

export const ANIME_COLLECTED = ['隐藏'] as const
