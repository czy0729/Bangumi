/*
 * @Author: czy0729
 * @Date: 2022-09-14 04:50:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 23:58:00
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
  '搞笑',
  '战斗',
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
  '萝莉',
  '歌舞',
  '神魔',
  '战争',
  '魔法',
  '社会',
  '运动',
  '玄幻',
  '美少女',
  '亲子',
  '历史',
  '职场',
  '日常',
  '犯罪',
  '恋爱',
  '游戏',
  '武侠',
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
  '京都动画',
  'GONZO',
  '动画工房',
  "Brain's Base",
  'MAPPA',
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
  'Studio五组',
  '8bit',
  'KINEMA CITRUS',
  'SATELIGHT',
  'project No.9',
  'CloverWorks',
  '绘梦',
  'david production',
  'ufotable',
  '玄机科技',
  'SANZIGEN',
  'SEVEN・ARCS',
  'ぴえろ',
  'AIC',
  'SHIN-EI动画',
  'Manglobe',
  'Hoods Entertainment',
  '东映アニメーション',
  'TNK',
  '圆谷制作',
  'Telecom Animation Film',
  'GoHands',
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
  'TRIGGER',
  'C2C',
  '亜细亜堂',
  'NOMAD',
  'ILCA',
  'TROYCA',
  '若鸿文化',
  'SynergySP',
  'Bridge',
  'Studio 3Hz',
  'Arms',
  'Hal Film Maker',
  'Nippon Animation',
  '福煦影视',
  '中影年年',
  'A・C・G・T',
  'Graphinica',
  'Lay-duce',
  '北京若森数字科技有限公司',
  'Creators in Pack',
  'PINE JAM',
  '幻维数码',
  'asread',
  'AIC ASTA',
  'STUDIO 4℃',
  'C-Station',
  'NAZ',
  '大火鸟文化',
  'PPI',
  'AXsiZ',
  'Science SARU',
  'GEEKTOYS',
  'ライデンフィルム',
  'トムス・エンタテインメント',
  'CoMix Wave Films',
  'Studio Gallop',
  'Ordet',
  'Actas',
  '白组',
  '旭Production',
  '朱夏',
  'EMT2',
  'MAHO FILM',
  '童梦',
  'スタジオコメット',
  'エイトビット',
  'GATHERING',
  '东映株式会社',
  'PlatinumVision',
  'DMM.futureworks',
  'BLADE',
  '精英集团',
  'ENGI'
] as const

const ANIME_OFFICIAL_MAP = {}
ANIME_OFFICIAL.forEach((item, index) => {
  ANIME_OFFICIAL_MAP[item] = index
})

export { ANIME_OFFICIAL_MAP }

export const ANIME_SORT = ['排名', '上映时间', '评分人数', '随机', '名称'] as const

export const ANIME_COLLECTED = ['隐藏'] as const
