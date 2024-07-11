/*
 * @Author: czy0729
 * @Date: 2022-07-12 09:57:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-10 16:17:50
 */
export const COMPONENT = 'Home'

export const TABS_ITEM = {
  all: {
    key: 'all',
    title: '全部'
  },
  anime: {
    key: 'anime',
    title: '动画'
  },
  book: {
    key: 'book',
    title: '书籍'
  },
  real: {
    key: 'real',
    title: '三次元'
  },
  game: {
    key: 'game',
    title: '游戏'
  }
} as const

/** Tabs 组件高度 */
export const H_TABBAR = 48
