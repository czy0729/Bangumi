/*
 * @Author: czy0729
 * @Date: 2022-07-31 18:28:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 10:39:17
 */
import { _ } from '@stores'
import { MODEL_MONO_WORKS_ORDERBY } from '@constants'
import { Loaded, MonoWorksOrderby } from '@types'

export const COMPONENT = 'Works'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** 职位, 默认全部 */
  position: '',

  /** 云快照 */
  ota: {}
}

export const STATE = {
  /** 排序 */
  order: MODEL_MONO_WORKS_ORDERBY.getValue<MonoWorksOrderby>('日期'),

  /** 布局 */
  list: true,

  /** 是否锁定工具条 (工具条) */
  fixed: false,

  /** 是否显示收藏条目 (工具条) */
  collected: true,
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
