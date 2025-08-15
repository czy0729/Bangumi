/*
 * @Author: czy0729
 * @Date: 2024-04-08 18:38:22
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-04-08 18:38:22
 */
export const COMPONENT = 'Zone'

export const TABS = [
  {
    title: '关于',
    key: 'about'
  },
  {
    title: '番剧',
    key: 'bangumi'
  },
  {
    title: '统计',
    key: 'stats'
  },
  {
    title: '时间线',
    key: 'timeline'
  },
  {
    title: '超展开',
    key: 'rakuen'
  }
] as const

export const TABS_WITH_TINYGRAIL = [
  ...TABS,
  {
    title: '小圣杯',
    key: 'tinygrail'
  }
] as const
