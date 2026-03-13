/*
 * @Author: czy0729
 * @Date: 2022-09-22 06:31:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-22 20:35:09
 */
import { DATA_ALPHABET } from '@constants/constants'
import { ANIME_COLLECTED, ANIME_YEAR } from '../anime'

export const MANGA_FIRST = DATA_ALPHABET

export const MANGA_YEAR = ANIME_YEAR

export const MANGA_COLLECTED = ANIME_COLLECTED

export const MANGA_STATUS = ['连载', '完结'] as const

export const MANGA_TAGS = [
  '爱情',
  '幽默',
  '冒险',
  '校园',
  '生活',
  '少女',
  '奇幻',
  '轻改',
  '悬疑',
  '魔幻',
  '科幻',
  '百合',
  '魔法',
  '热血',
  '少年',
  '职场',
  '神鬼',
  '治癒',
  '格斗',
  '恐怖',
  '竞技',
  '侦探',
  '励志',
  '青年',
  '歷史',
  '耽美',
  '萌系',
  '后宫',
  '四格',
  '战争',
  '美食',
  '生存',
  '机战',
  '伪娘',
  '音乐',
  '性转',
  '宅系',
  '转生',
  '其他',
  '穿越',
  '武侠',
  '绘本',
  '艺术',
  '童话',
  '东方',
  '仙侠',
  '杂志',
  '连环画'
] as const

export const MANGA_TAGS_MAP = Object.fromEntries(
  MANGA_TAGS.map((item, index) => [item, index])
) as Record<(typeof MANGA_TAGS)[number], number>

export const MANGA_AUTHORS = [
  '手冢治虫',
  'CLAMP',
  '永井豪',
  '安达充',
  '赤石路代',
  '弘兼宪史',
  '西炯子',
  '谷口治郎',
  '藤子·F·不二雄',
  '伊藤润二',
  '柴门文',
  '福本伸行',
  '河内由加利',
  '荒木飞吕彦',
  '安彦良和',
  '藤沢亨',
  '吉富昭仁',
  '齐藤千穗',
  '仓科辽',
  '押切莲介',
  '由贵香织里',
  '楠桂',
  '矢立肇',
  '浅野一二〇',
  '高桥留美子',
  '冬目景',
  '古屋兔丸',
  '山口让司',
  '仓桥绘里花',
  '岩明均',
  '水上悟志',
  '车田正美',
  '清水玲子',
  '星野之宣',
  '天树征丸',
  '筱原千绘',
  '武井宏之',
  '吉原由起',
  '铃木央',
  '外薗昌也',
  '本宫宏志'
] as const

export const MANGA_AUTHORS_MAP = Object.fromEntries(
  MANGA_AUTHORS.map((item, index) => [item, index])
) as Record<(typeof MANGA_AUTHORS)[number], number>

export const MANGA_HD = ['HD'] as const

export const MANGA_SORT = ['排名', '更新时间', '评分人数', '外网热度', '随机'] as const
