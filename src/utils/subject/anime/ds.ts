/*
 * @Author: czy0729
 * @Date: 2022-09-14 04:50:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-14 15:16:35
 */
import { getTimestamp } from '@utils'
import { getPinYinFirstCharacter } from '@utils/thirdParty/pinyin'
import { DATA_ALPHABET } from '@constants/constants'

/** 预设排序 */
export const SORT = {
  // 上映时间
  begin(a = {}, b = {}, key = 'b') {
    return (getTimestamp(b[key]) || 0) - (getTimestamp(a[key]) || 0)
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
  // 首屏
  'J.C.STAFF',
  'A-1 Pictures',
  'Studio DEEN',
  'BONES',
  '京都动画',
  'SHAFT',
  'XEBEC',
  'TMS Entertainment',
  'LIDENFILMS',
  "Brain's Base",
  'GONZO',
  '小丑社',
  'WHITE FOX',
  '8bit',
  'SEVEN・ARCS',
  'OLM',
  'ZEXCS',
  'WIT STUDIO',
  'project No.9',
  '玄机科技',
  'david production',
  'Hoods Entertainment',
  '龙之子Production',
  '绘梦',
  'KINEMA CITRUS',
  'ufotable',
  'Manglobe',
  'SANZIGEN',
  'GoHands',
  'GAINAX',
  'Production IMS',
  'AIC',
  'Studio五組',
  'BN Pictures',
  'ZERO-G',
  'Seven',
  'Arms',
  'TNK',
  '东映动画',
  'CloverWorks',
  'TRIGGER',
  '上海福煦影视文化投资有限公司',
  'PPI',
  'Passione',
  'asread',

  // 次屏
  'W-toon Studio',
  '视美精典',
  '铸梦动画',
  'GEMBA',
  '中影年年',
  'BLADE',
  'studio A-CAT',
  'Science SARU',
  '幻维数码',
  '若鸿文化',
  'Magic Bus',
  'Signal-MD',

  // 首屏
  'MAPPA',
  'MADHOUSE',
  'SUNRISE',
  'Production I.G',
  'SILVER LINK.',
  '動画工房',
  'feel.',
  'diomedéa',
  'Lerche',
  'SATELIGHT',
  'P.A.WORKS',
  '東映動画',

  // 次屏
  'Nippon Animation',
  'Studio五组',
  'CONNECT',
  'Creators in Pack',
  'NOMAD',
  'Actas',
  'Bridge',
  'Telecom Animation Film',
  'ARTLAND',
  'SHIN-EI动画',
  'C-Station',
  'TROYCA',
  'TYO Animations',
  'Studio 3Hz',
  'ILCA',
  'C2C',
  'Lay-duce',
  '朱夏',
  'AXsiZ',
  'Hal Film Maker',
  'AIC ASTA',
  'Graphinica',
  'Ordet',
  'GATHERING',
  '动画工房',
  'Pierrot+',
  '北京若森数字科技有限公司',
  'PINE JAM',
  '亜細亜堂',
  '精英集团',
  'Encourage Films',
  'NAZ',
  '旭Production',
  'Genostudio',
  'Millepensee',
  'PlatinumVision',
  'DMM.futureworks',
  'EMT2',
  '童夢',
  'CoMix Wave Films',
  '云雀工作室',
  '彗星社',
  'Nexus',
  'Orange'
] as const

export const ANIME_SORT = ['排名', '上映时间', '随机', '名称'] as const

export const ANIME_HENTAI_CHARA = [
  // 人物
  '姐',
  '妹',
  '母',
  '人妻',
  '青梅竹马',
  '处女',
  '御姐',
  '熟女'
] as const

export const ANIME_HENTAI_JOB = [
  // 职业
  'JK',
  '运动少女',
  '大小姐',
  '老师',
  '女医护士',
  '女僕',
  '巫女',
  '修女',
  '偶像',
  'OL',
  '风俗娘',
  '公主',
  '女骑士',
  '魔法少女',
  '妖精',
  '魔物娘',
  '兽娘'
] as const

export const ANIME_HENTAI_BODY = [
  // 外貌
  '巨乳',
  '贫乳',
  '黑皮肤',
  '眼镜娘',
  '泳装',
  '围裙',
  '黑丝袜',
  '和服',
  '兽耳',
  '碧池',
  '不良少女',
  '傲娇',
  '病娇',
  '伪娘',
  '扶他'
] as const

export const ANIME_HENTAI_CONTENT = [
  // 剧情
  '自慰',
  '口交',
  '乳交',
  '肛交',
  '脚交',
  '腋下',
  '玩具',
  '触手',
  '内射',
  '颜射',
  '3P',
  '群交',
  '肉便器',
  '后宫',
  '公众场合',
  '近亲',
  '师生',
  'NTR',
  '怀孕',
  '喷奶',
  '放尿',
  '精神控制',
  '药物',
  '痴汉',
  '阿嘿颜',
  '精神崩溃',
  '鬼畜',
  'BDSM',
  '调教',
  '强制',
  '逆强制',
  '痴女',
  '女王样',
  '百合',
  '耽美',
  '性转换',
  '异世界',
  '异种族',
  '纯爱',
  '恋爱喜剧',
  '世界末日'
] as const
