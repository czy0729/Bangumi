/*
 * @Author: czy0729
 * @Date: 2022-09-14 04:50:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-06 02:47:52
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
  '治愈',
  '科幻',
  '爱情',
  '百合',
  '后宫',
  '热血',
  '励志',
  '悬疑',
  '竞技',
  '歌舞',
  '泡面番',
  '玄幻',
  '神魔',
  '女性向',
  '战争',
  '青春',
  '机战',
  '运动',
  '社会',
  '历史',
  '职场',
  '魔法',
  '武侠',
  '亲子',
  '犯罪',
  '剧情',
  '日常',
  '偶像',
  '恋爱',
  '耽美',
  '推理',
  '其他',
  '恐怖',
  '特摄',
  '萝莉',
  '吸血鬼',
  '游戏',
  '血腥',
  '美少女',
  '亲情',
  '猎奇',
  '少女',
  '穿越',
  '音乐',
  '智斗',
  '都市',
  '动作',
  '宠物',
  '美食',
  '教育',
  '生存',
  '欢乐向',
  '童年',
  '古风',
  '伪娘',
  '异世界',
  '乙女向'
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
  'Studio DEEN',
  'SUNRISE',
  'Production I.G',
  'SHAFT',
  'SILVER LINK.',
  'BONES',
  'LIDENFILMS',
  'TMS Entertainment',
  '东映动画',
  '京都动画',
  '动画工房',
  'XEBEC',
  'MAPPA',
  "Brain's Base",
  'OLM',
  '小丑社',
  'diomedéa',
  'GONZO',
  'feel.',
  'WIT STUDIO',
  'P.A.WORKS',
  'Lerche',
  'SATELIGHT',
  '8bit',
  'ZEXCS',
  'Studio五组',
  'BN Pictures',
  'WHITE FOX',
  'KINEMA CITRUS',
  'david production',
  '龙之子Production',
  'project No.9',
  'CloverWorks',
  'SEVEN・ARCS',
  'ufotable',
  'SANZIGEN',
  'TNK',
  'AIC',
  '玄机科技',
  'Hoods Entertainment',
  '暂缺',
  'GAINAX',
  'Manglobe',
  '绘梦',
  'ZERO-G',
  'GoHands',
  'Telecom Animation Film',
  'Seven',
  'Production IMS',
  'PPI',
  'NOMAD',
  'SHIN-EI动画',
  'CONNECT',
  'Passione',
  'TRIGGER',
  'C2C',
  'Seven Arcs',
  'Arms',
  'asread',
  'TROYCA',
  '上海福煦影视文化投资有限公司',
  'Nippon Animation',
  'Bridge',
  'Studio 3Hz',
  'Hal Film Maker',
  'Graphinica',
  'C-Station',
  'TYO Animations',
  'ARTLAND',
  'Actas',
  'ILCA',
  'Lay-duce',
  'Creators in Pack',
  'AXsiZ',
  'PINE JAM'
] as const

const ANIME_OFFICIAL_MAP = {}
ANIME_OFFICIAL.forEach((item, index) => {
  ANIME_OFFICIAL_MAP[item] = index
})

export { ANIME_OFFICIAL_MAP }

export const ANIME_SORT = ['排名', '上映时间', '评分人数', '随机', '名称'] as const

export const ANIME_COLLECTED = ['隐藏'] as const
