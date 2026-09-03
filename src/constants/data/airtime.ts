/*
 * @Author: czy0729
 * @Date: 2026-09-03 23:08:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:08:45
 *
 * 放送时间与筛选数据
 */

/** 放送年份与筛选数据 */
export const DATA_AIRTIME = (() => {
  const currentYear = new Date().getFullYear()
  const years = ['全部']
  for (let year = currentYear; year >= 1980; year--) {
    years.push(year.toString())
  }
  return years
})()

/** 月份 */
export const DATA_MONTH = [
  '全部',
  ...Array.from({ length: 12 }, (_, i) => (i + 1).toString())
] as const

/** 来源 */
export const DATA_SOURCE = ['全部', '原创', '漫画改', '游戏改', '小说改'] as const

/** 动画类型公共标签 */
export const DATA_ANIME_TAG = [
  '全部',
  '科幻',
  '喜剧',
  '百合',
  '校园',
  '惊悚',
  '后宫',
  '机战',
  '悬疑',
  '恋爱',
  '奇幻',
  '推理',
  '运动',
  '耽美',
  '音乐',
  '战斗',
  '冒险',
  '萌系',
  '穿越',
  '玄幻',
  '乙女',
  '恐怖',
  '历史',
  '日常',
  '剧情',
  '武侠',
  '美食',
  '职场'
] as const

/** 动画地区 */
export const DATA_ANIME_AREA = [
  '全部',
  '欧美',
  '日本',
  '美国',
  '中国',
  '法国',
  '韩国',
  '俄罗斯',
  '英国',
  '苏联',
  '中国香港',
  '捷克',
  '中国台湾'
] as const

/** 动画受众 */
export const DATA_ANIME_TARGET = [
  '全部',
  'BL',
  'GL',
  '子供向',
  '女性向',
  '少女向',
  '少年向',
  '青年向'
] as const

/** 游戏类型公共标签 */
export const DATA_GAME_TAG = [
  '全部',
  'AAVG',
  'ACT',
  'ADV',
  'ARPG',
  'AVG',
  'CRPG',
  'DBG',
  'DRPG',
  'EDU',
  'FPS',
  'FTG',
  'Fly',
  'Horror',
  'JRPG',
  'MMORPG',
  'MOBA',
  'MUG',
  'PUZ',
  'Platform',
  'RAC',
  'RPG',
  'RTS',
  'RTT',
  'Roguelike',
  'SIM',
  'SLG',
  'SPG',
  'SRPG',
  'STG',
  'Sandbox',
  'Survival',
  'TAB',
  'TPS',
  'VN',
  '休闲',
  '卡牌对战'
] as const

/** 游戏受众 */
export const DATA_GAME_TARGET = ['全部', 'Galgame', 'BL', '乙女'] as const

/** 游戏分级 */
export const DATA_CLASSIFICATION = ['全部', '全年龄', 'R18'] as const

/** 三次元题材 */
export const DATA_THEME = [
  '全部',
  '犯罪',
  '悬疑',
  '推理',
  '喜剧',
  '爱情',
  '特摄',
  '科幻',
  '音乐',
  '校园',
  '美食',
  '奇幻',
  '动作',
  '家庭',
  '战争',
  '玄幻',
  '西部',
  '歌舞',
  '历史',
  '传记',
  '剧情',
  '纪录片',
  '恐怖',
  '惊悚',
  '职场',
  '武侠',
  '古装',
  '布袋戏',
  '灾难',
  '冒险',
  '少儿',
  '运动',
  '同性'
] as const

/** 三次元地区 */
export const DATA_REAL_AREA = [
  '全部',
  '日本',
  '欧美',
  '美国',
  '中国',
  '华语',
  '英国',
  '韩国',
  '中国香港',
  '中国台湾',
  '法国',
  '俄罗斯',
  '意大利',
  '加拿大',
  '新西兰',
  '泰国'
] as const

/** 索引年 */
export const DATA_BROWSER_AIRTIME = (() => {
  const currentYear = new Date().getFullYear()
  const years: string[] = []
  for (let year = currentYear; year >= 1949; year--) {
    years.push(year.toString())
  }
  return years
})()

/** 索引时间月 */
export const DATA_BROWSER_MONTH = Array.from({ length: 12 }, (_, i) => (i + 1).toString())

/** 字母表 */
export const DATA_ALPHABET = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))

/** 公共标签 */
export const DATA_META = ['公共标签', '用户标签'] as const

/** 目录类型映射 */
export const DATA_CATALOG_TYPE_MAP = {
  anime: '动画',
  book: '书籍',
  music: '音乐',
  game: '游戏',
  real: '三次元',
  character: '角色',
  person: '人物',
  topic: '小组',
  blog: '日志',
  ep: '章节'
} as const
