/*
 * @Author: czy0729
 * @Date: 2023-11-01 08:44:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 04:35:01
 */
import { _ } from '@stores'
import { Loaded, SubjectId } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 查询搜索中 */
  searching: false,

  /** 索引 */
  ids: [] as SubjectId[]
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 缓存条目快照 */
  subjects: {},

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
