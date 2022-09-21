/*
 * @Author: czy0729
 * @Date: 2022-09-14 04:50:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-20 17:36:53
 */
import { getTimestamp } from '@utils'
import { getPinYinFirstCharacter } from '@utils/thirdParty/pinyin'
import { DATA_ALPHABET } from '@constants/constants'

/** 预设排序 */
export const SORT = {
  // 上映时间
  begin(a = {}, b = {}, key = 'b') {
    return (getTimestamp(b[key] || '') || 0) - (getTimestamp(a[key] || '') || 0)
  },

  // 名称
  name(a = {}, b = {}, key = 'c') {
    return getPinYinFirstCharacter(a[key] || '').localeCompare(
      getPinYinFirstCharacter(b[key] || '')
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
  '后宫',
  '百合',
  '校园',
  '励志',
  '治愈',
  '冒险',
  '战斗',
  '竞技',
  '魔法',
  '青春',
  '游戏',
  '神魔',
  '歌舞',
  '恐怖',
  '血腥',
  '爱情',
  '萝莉',
  '搞笑',
  '运动',
  '战争',
  '剧情',
  '社会',
  '犯罪',
  '历史',
  '职场',
  // '伪娘',
  '耽美',
  '童年',
  '教育',
  '亲子',
  // '真人',
  '悬疑',
  '推理',
  '奇幻',
  '科幻',
  // '肉番',
  '机战',
  '热血',
  '美少女',
  '轻小说',
  '吸血鬼',
  '乙女向',
  '泡面番',
  '欢乐向'
] as const

export const ANIME_OFFICIAL = [
  'J.C.STAFF',
  'A-1 Pictures',
  'Studio DEEN',
  'MADHOUSE',
  'SUNRISE',
  'Production I.G',
  'SHAFT',
  'SILVER LINK.',
  'BONES',
  'LIDENFILMS',
  '京都动画',
  '东映动画',
  'TMS Entertainment',
  '动画工房',
  'XEBEC',
  'MAPPA',
  "Brain's Base",
  '小丑社',
  'diomedéa',
  'GONZO',
  'feel.',
  'OLM',
  'Lerche',
  'WIT STUDIO',
  'P.A.WORKS',
  'SATELIGHT',
  'ZEXCS',
  'Studio五组',
  '8bit',
  'WHITE FOX',
  'KINEMA CITRUS',
  'david production',
  '龙之子Production',
  'SEVEN・ARCS',
  'project No.9',
  'BN Pictures',
  'CloverWorks',
  'ufotable',
  'SANZIGEN',
  'TNK',
  'AIC',
  '玄机科技',
  'Hoods Entertainment',
  '绘梦',
  'GAINAX',
  'Manglobe',
  'GoHands',
  'Seven',
  'Production IMS',
  'PPI',
  'ZERO-G',
  'Telecom Animation Film',
  'Passione',
  'NOMAD',
  'SHIN-EI动画',
  'TRIGGER',
  'Arms',
  'CONNECT',
  '上海福煦影视文化投资有限公司',
  'asread',
  'Nippon Animation',
  'Bridge',
  'Seven Arcs',
  'Hal Film Maker',
  'Graphinica',
  'C2C',
  'TROYCA',
  'TYO Animations',
  'Creators in Pack',
  'ARTLAND',
  'Actas',
  'ILCA',
  'Lay-duce',
  'Studio 3Hz',
  'AXsiZ',
  'PINE JAM',
  'Ordet',
  'C-Station',
  '亜细亜堂',
  'Pierrot+',
  'NAZ',
  '朱夏',
  'PlatinumVision',
  'DMM.futureworks',
  'EMT2',
  'Science SARU'
] as const

export const ANIME_SORT = ['排名', '上映时间', '随机', '名称'] as const
