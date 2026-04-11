/*
 * @Author: czy0729
 * @Date: 2022-09-14 04:50:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-12 01:20:40
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
  2026,
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
  '热血',
  '百合',
  '爱情',
  '后宫',
  '励志',
  '悬疑',
  '轻小说',
  '青春',
  '竞技',
  '日常',
  '剧情',
  '恋爱',
  '女性向',
  '泡面番',
  '机战',
  '歌舞',
  '魔法',
  '神魔',
  '萝莉',
  '运动',
  '战争',
  '社会',
  '玄幻',
  '亲子',
  '美少女',
  '历史',
  '职场',
  '推理',
  '游戏',
  '犯罪',
  '耽美',
  '武侠',
  '恐怖',
  '欢乐向',
  '血腥',
  '吸血鬼',
  '伪娘',
  '穿越',
  '偶像',
  '其它',
  '其他',
  '教育',
  '亲情',
  '肉番',
  '特摄',
  '动作',
  '童年'
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
  'SILVER LINK.',
  'SUNRISE',
  'SHAFT',
  'MAPPA',
  'XEBEC',
  'スタジオディーン',
  'LIDENFILMS',
  'TMS Entertainment',
  '动画工房',
  'OLM',
  "Brain's Base",
  '京都动画',
  'GONZO',
  'WIT STUDIO',
  'diomedéa',
  'サンライズ',
  'P.A.WORKS',
  'feel.',
  'CloverWorks',
  'BN Pictures',
  'ZEXCS',
  '小丑社',
  'WHITE FOX',
  '龙之子Production',
  'project No.9',
  'KINEMA CITRUS',
  'Lerche',
  '东映アニメーション',
  'Studio五组',
  'david production',
  '暂缺',
  '8bit',
  'ufotable',
  'SATELIGHT',
  '绘梦',
  '玄机科技',
  'SANZIGEN',
  'トムス・エンタテインメント',
  'ぴえろ',
  'ライデンフィルム',
  'SEVEN・ARCS',
  'Telecom Animation Film',
  'AIC',
  'SHIN-EI动画',
  'Manglobe',
  'Hoods Entertainment',
  'Seven Arcs',
  'TNK',
  '圆谷制作',
  'GoHands',
  'CONNECT',
  'ILCA',
  'SynergySP',
  'TRIGGER',
  'TROYCA',
  'ZERO-G',
  '亜细亜堂',
  'エイトビット',
  'Seven',
  'TYO Animations',
  'Passione',
  'GAINAX',
  'ARMS',
  '上海福煦影视文化投资有限公司',
  '索以文化',
  'ARTLAND',
  'Satelight',
  'Production IMS',
  'C2C',
  'NOMAD',
  '福煦影视',
  'FelixFilm',
  '若鸿文化',
  'スタジオKAI',
  'ENGI',
  'Bridge',
  'NAZ',
  'Studio 3Hz',
  'PINE JAM',
  'MAHO FILM',
  'スタジオコメット',
  'A・C・G・T',
  'Arms',
  'Hal Film Maker',
  'Nippon Animation',
  'CygamesPictures',
  '中影年年',
  'studio A-CAT',
  'studio HōKIBOSHI',
  'サテライト',
  'Graphinica',
  'C-Station',
  'Lay-duce',
  '朱夏',
  '北京若森数字科技有限公司',
  'Creators in Pack',
  'EMTスクエアード',
  '幻维数码',
  'GEEKTOYS',
  'asread',
  'AIC ASTA',
  'Studio Gallop',
  'STUDIO 4℃',
  '手冢プロダクション',
  '白组',
  '大火鸟文化',
  'PPI',
  'AXsiZ',
  'BLADE',
  'Science SARU',
  'ゼロジー',
  'Yostar Pictures'
] as const

export const ANIME_OFFICIAL_MAP = Object.fromEntries(
  ANIME_OFFICIAL.map((item, index) => [item, index])
) as Record<(typeof ANIME_OFFICIAL)[number], number>

export const ANIME_SORT = ['排名', '上映时间', '评分人数', '随机', '名称'] as const

export const ANIME_COLLECTED = ['隐藏'] as const
