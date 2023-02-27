/*
 * @Author: czy0729
 * @Date: 2022-07-12 09:57:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-27 20:34:32
 */
/** 基本 Tabs */
export const TABS = [
  {
    key: 'all',
    title: '全部'
  },
  {
    key: 'anime',
    title: '动画'
  },
  {
    key: 'book',
    title: '书籍'
  },
  {
    key: 'real',
    title: '三次元'
  }
] as const

/** 带游戏类型的 Tabs */
export const TABS_WITH_GAME = [
  ...TABS,
  {
    key: 'game',
    title: '游戏'
  }
] as const

/** Tabs 组件高度 */
export const H_TABBAR = 48
