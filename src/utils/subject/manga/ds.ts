/*
 * @Author: czy0729
 * @Date: 2022-09-22 06:31:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-22 06:32:08
 */
import { DATA_ALPHABET } from '@constants/constants'
import { ANIME_COLLECTED, ANIME_YEAR } from './../anime'

export const MANGA_FIRST = DATA_ALPHABET

export const MANGA_YEAR = ANIME_YEAR

export const MANGA_COLLECTED = ANIME_COLLECTED

export const MANGA_STATUS = ['连载', '完结'] as const

export const MANGA_TAGS = [
  '爱情',
  '幽默',
  '冒险',
  '校园',
  '少女',
  '生活',
  '悬疑',
  '轻改',
  '魔幻',
  '科幻',
  '奇幻',
  '百合',
  '魔法',
  '少年',
  '神鬼',
  '职场',
  '热血',
  '格斗',
  '恐怖',
  '治癒',
  '侦探',
  '竞技',
  '耽美',
  '励志',
  '青年',
  '歷史',
  '四格',
  '萌系',
  '后宫',
  '战争',
  '美食',
  '机战',
  '伪娘',
  '生存',
  '音乐',
  '性转',
  '宅系',
  '其他',
  '绘本',
  '武侠',
  '东方',
  '仙侠',
  '连环画',
  '童话'
] as const

const MANGA_TAGS_MAP = {}
MANGA_TAGS.forEach((item, index) => {
  MANGA_TAGS_MAP[item] = index
})

export { MANGA_TAGS_MAP }

export const MANGA_HD = ['HD'] as const

export const MANGA_SORT = ['排名', '发行时间', '评分人数', '随机', '名称'] as const
