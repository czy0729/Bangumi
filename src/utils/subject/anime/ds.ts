/*
 * @Author: czy0729
 * @Date: 2022-09-14 04:50:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-30 05:39:14
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
  2025,
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
  '竞技',
  '剧情',
  '青春',
  '女性向',
  '泡面番',
  '机战',
  '日常',
  '歌舞',
  '魔法',
  '神魔',
  '萝莉',
  '运动',
  '战争',
  '恋爱',
  '社会',
  '玄幻',
  '亲子',
  '美少女',
  '历史',
  '职场',
  '游戏',
  '犯罪',
  '推理',
  '耽美',
  '武侠',
  '恐怖',
  '欢乐向',
  '血腥',
  '伪娘',
  '吸血鬼',
  '穿越',
  '偶像'
] as const

export const ANIME_TAGS_MAP = Object.fromEntries(
  ANIME_TAGS.map((item, index) => [item, index])
) as Record<(typeof ANIME_TAGS)[number], number>

export const ANIME_OFFICIAL = [
  'J.C.STAFF',
  'A-1 Pictures',
  'MADHOUSE',
  'Production I.G',
  '东映动画',
  'BONES',
  'Studio DEEN',
  'SUNRISE',
  'SILVER LINK.',
  'SHAFT',
  'XEBEC',
  'LIDENFILMS',
  'TMS Entertainment',
  'OLM',
  'MAPPA',
  '动画工房',
  '京都动画',
  'スタジオディーン',
  "Brain's Base",
  'GONZO',
  'WIT STUDIO',
  'diomedéa',
  'feel.',
  'サンライズ',
  'P.A.WORKS',
  '小丑社',
  'ZEXCS',
  '龙之子Production',
  'CloverWorks',
  'WHITE FOX',
  'BN Pictures',
  'Lerche',
  'KINEMA CITRUS',
  'project No.9',
  'Studio五组',
  '8bit',
  'SATELIGHT',
  'david production',
  'ufotable',
  '绘梦',
  '东映アニメーション',
  '玄机科技',
  'SANZIGEN',
  'ぴえろ',
  'SEVEN・ARCS',
  'Telecom Animation Film',
  'AIC',
  'SHIN-EI动画',
  '暂缺',
  'Manglobe',
  'Hoods Entertainment',
  'TNK',
  '圆谷制作',
  'GoHands',
  'Seven Arcs',
  'ZERO-G',
  'Seven',
  'TYO Animations',
  'Passione',
  'CONNECT',
  'ILCA',
  'GAINAX',
  'ARMS',
  '亜细亜堂',
  'TRIGGER',
  'TROYCA',
  '上海福煦影视文化投资有限公司',
  '索以文化',
  'ライデンフィルム',
  'ARTLAND',
  'Satelight',
  'エイトビット',
  'Production IMS',
  'C2C',
  'トムス・エンタテインメント',
  'SynergySP',
  'NOMAD',
  '若鸿文化',
  'Bridge',
  '福煦影视',
  'Studio 3Hz',
  'Arms',
  'Hal Film Maker',
  'Nippon Animation',
  'PINE JAM',
  '中影年年',
  'MAHO FILM',
  'A・C・G・T',
  'Graphinica',
  'C-Station',
  'NAZ',
  'Lay-duce',
  '北京若森数字科技有限公司',
  'Creators in Pack',
  '幻维数码',
  'GEEKTOYS',
  'ENGI',
  'studio HōKIBOSHI',
  'asread',
  'AIC ASTA',
  'STUDIO 4℃',
  '大火鸟文化',
  '朱夏',
  'PPI',
  'AXsiZ',
  'CygamesPictures',
  'EMTスクエアード',
  'FelixFilm',
  'studio A-CAT',
  'Science SARU',
  'スタジオコメット',
  'CoMix Wave Films',
  'Studio Gallop',
  'サテライト',
  'Ordet',
  'シンエイ动画',
  'Actas',
  '东映株式会社',
  '手冢プロダクション',
  '白组',
  'ポリゴン・ピクチュアズ',
  '旭Production',
  'BLADE',
  'EMT2',
  '童梦',
  'GATHERING',
  'PlatinumVision',
  'DMM.futureworks',
  'NUT',
  'SIGNAL.MD',
  '精英集团',
  'Yostar Pictures'
] as const

export const ANIME_OFFICIAL_MAP = Object.fromEntries(
  ANIME_OFFICIAL.map((item, index) => [item, index])
) as Record<(typeof ANIME_OFFICIAL)[number], number>

export const ANIME_SORT = ['排名', '上映时间', '评分人数', '随机', '名称'] as const

export const ANIME_COLLECTED = ['隐藏'] as const
