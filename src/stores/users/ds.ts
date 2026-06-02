/*
 * @Author: czy0729
 * @Date: 2026-06-01 00:00:00
 * @Last Modified by: imagebuilder1837
 * @Last Modified time: 2026-06-01 00:00:00
 */

/** 用户统计类型 */
export const USER_STATS_TYPES = [
  {
    title: '全部',
    value: 'all'
  },
  {
    title: '动画',
    value: '2'
  },
  {
    title: '书籍',
    value: '1'
  },
  {
    title: '音乐',
    value: '3'
  },
  {
    title: '游戏',
    value: '4'
  },
  {
    title: '电视剧',
    value: '6'
  }
] as const

export type UserStatsKey = (typeof USER_STATS_TYPES)[number]['value']

export type UserStatsTitle = (typeof USER_STATS_TYPES)[number]['title']
