/*
 * @Author: czy0729
 * @Date: 2023-11-01 08:44:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * NAMESPACE / RESET_STATE / EXCLUDE_STATE / STATE
 */
import { _ } from '@stores'
import { COMPONENT } from '../ds'

import type { Loaded, SubjectId } from '@types'
import type { OssSubject } from '../types'

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
  subjects: {} as Record<string, OssSubject>,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
