/*
 * @Author: czy0729
 * @Date: 2022-09-01 12:47:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 03:54:17
 */
import { _ } from '@stores'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** tab 的 page */
  page: 0,

  /** 是否显示列表, 制造切页效果 */
  show: true,

  /** 当前页数 */
  currentPage: {
    all: 1,
    anime: 1,
    book: 1,
    game: 1,
    music: 1,
    real: 1
  },

  /** 输入框值 */
  ipt: {
    all: '1',
    anime: '1',
    book: '1',
    game: '1',
    music: '1',
    real: '1'
  },

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
