/*
 * @Author: czy0729
 * @Date: 2022-09-14 04:50:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-19 22:01:16
 */
import { asc, getTimestamp } from '@utils'
import { getPinYinFirstCharacter } from '@utils/thirdParty/pinyin'
import { DATA_ALPHABET } from '@constants/constants'

/** 预设排序 */
export const SORT = {
  /** 上映时间 */
  begin<T extends Record<string, any>>(a: Partial<T> = {}, b: Partial<T> = {}, key: keyof T = 'b') {
    return (getTimestamp(b[key] || '0000-00-00') || 0) - (getTimestamp(a[key] || '0000-00-00') || 0)
  },

  /** 名称 */
  name<T extends Record<string, any>>(a: Partial<T> = {}, b: Partial<T> = {}, key: keyof T = 'c') {
    return asc(
      String(getPinYinFirstCharacter(a[key] || '')),
      String(getPinYinFirstCharacter(b[key] || ''))
    )
  },

  /** 评分或排名 */
  rating<T extends Record<string, any>>(
    a: Partial<T> = {},
    b: Partial<T> = {},
    keyScore: keyof T = 's',
    keyRank: keyof T = 'r'
  ) {
    const sA = a[keyScore] || 0
    const sB = b[keyScore] || 0
    const rA = a[keyRank] === undefined ? -10000 : 10000 - a[keyRank]
    const rB = b[keyRank] === undefined ? -10000 : 10000 - b[keyRank]
    return sB + rB - (sA + rA)
  },

  /** 随机 */
  random() {
    return 0.5 - Math.random()
  },

  /** 分数, 也可用于数值比较 */
  score<T extends Record<string, any>>(a: Partial<T> = {}, b: Partial<T> = {}, key: keyof T = 's') {
    return Number(b[key] || 0) - Number(a[key] || 0)
  },

  /** 评分人数 */
  total<T extends Record<string, any>>(a: Partial<T> = {}, b: Partial<T> = {}, key: keyof T = 'l') {
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
  2024,
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
  '战斗',
  '搞笑',
  '校园',
  '冒险',
  '科幻',
  '治愈',
  '爱情',
  '百合',
  '热血',
  '后宫',
  '励志',
  '悬疑',
  '轻小说',
  '剧情',
  '竞技',
  '青春',
  '女性向',
  '泡面番',
  '机战',
  '歌舞',
  '神魔',
  '萝莉',
  '魔法',
  '战争',
  '运动',
  '社会',
  '玄幻',
  '日常',
  '亲子',
  '美少女',
  '历史',
  '恋爱',
  '职场',
  '游戏',
  '犯罪',
  '耽美',
  '武侠',
  '推理',
  '恐怖',
  '欢乐向',
  '血腥',
  '伪娘',
  '吸血鬼',
  '穿越',
  '偶像'
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
  'Production I.G',
  '东映动画',
  'Studio DEEN',
  'BONES',
  'SUNRISE',
  'SILVER LINK.',
  'SHAFT',
  'XEBEC',
  'LIDENFILMS',
  'TMS Entertainment',
  'OLM',
  '动画工房',
  '京都动画',
  'MAPPA',
  "Brain's Base",
  'GONZO',
  'スタジオディーン',
  'WIT STUDIO',
  'diomedéa',
  'feel.',
  '小丑社',
  'P.A.WORKS',
  'ZEXCS',
  '龙之子Production',
  'サンライズ',
  'Lerche',
  'WHITE FOX',
  'project No.9',
  'CloverWorks',
  'BN Pictures',
  'Studio五组',
  '8bit',
  'KINEMA CITRUS',
  'SATELIGHT',
  'ufotable',
  'david production',
  '绘梦',
  '玄机科技',
  'SANZIGEN',
  '东映アニメーション',
  'ぴえろ',
  'SEVEN・ARCS',
  'AIC',
  'SHIN-EI动画',
  'Manglobe',
  'Telecom Animation Film',
  'Hoods Entertainment',
  'TNK',
  '圆谷制作',
  'Seven Arcs',
  'GoHands',
  'ZERO-G',
  'Seven',
  'TYO Animations',
  'Passione',
  'CONNECT',
  '暂缺',
  'GAINAX',
  'ARMS',
  'TRIGGER',
  'ILCA',
  '上海福煦影视文化投资有限公司',
  '索以文化',
  'ARTLAND',
  '亜细亜堂',
  'Satelight',
  'Production IMS',
  'TROYCA',
  'NOMAD',
  'C2C',
  '若鸿文化',
  'SynergySP',
  'Bridge',
  'エイトビット',
  'Studio 3Hz',
  'Arms',
  'Hal Film Maker',
  'Nippon Animation',
  '福煦影视',
  'PINE JAM',
  '中影年年',
  'ライデンフィルム',
  'A・C・G・T',
  'トムス・エンタテインメント',
  'Graphinica',
  'NAZ',
  'Lay-duce',
  '北京若森数字科技有限公司',
  'Creators in Pack',
  '幻维数码',
  'GEEKTOYS',
  'asread',
  'AIC ASTA',
  'STUDIO 4℃',
  'C-Station',
  '大火鸟文化',
  'PPI',
  'AXsiZ',
  'Science SARU',
  'MAHO FILM',
  'studio HōKIBOSHI'
] as const

const ANIME_OFFICIAL_MAP = {}
ANIME_OFFICIAL.forEach((item, index) => {
  ANIME_OFFICIAL_MAP[item] = index
})

export { ANIME_OFFICIAL_MAP }

export const ANIME_SORT = ['排名', '上映时间', '评分人数', '随机', '名称'] as const

export const ANIME_COLLECTED = ['隐藏'] as const
