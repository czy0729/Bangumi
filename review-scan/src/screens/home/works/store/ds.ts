/*
 * @Author: czy0729
 * @Date: 2022-07-31 18:28:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-06 00:33:36
 */
import { _ } from '@stores'
import { MODEL_MONO_WORKS_ORDERBY } from '@constants'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 职位, 默认全部 */
  position: '',

  /** 云快照 */
  ota: {}
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 排序 */
  order: MODEL_MONO_WORKS_ORDERBY.getValue('日期'),

  /** 布局 */
  list: true,

  /** 是否锁定工具条 (工具条) */
  fixed: false,

  /** 是否显示收藏条目 (工具条) */
  collected: true,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
