/*
 * @Author: czy0729
 * @Date: 2023-12-17 08:12:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-29 13:13:10
 */
import { _ } from '@stores'
import { NEWS } from '@constants'
import { Id, Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 隐藏后延迟显示列表 (用于重置滚动位置) */
  show: true,

  /** 当前页数 */
  page: 1,

  /** Input 页数 */
  ipt: '1'
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 记录文章点击过的 ID */
  history: [] as Id[],

  /** 站点 */
  type: NEWS[2].value,

  /** 是否使用内置浏览器打开, 否则使用外部 */
  useWebView: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
