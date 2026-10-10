/*
 * @Author: czy0729
 * @Date: 2022-07-26 22:57:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:20:00
 *
 * 缓存命名空间与状态初始值
 */
import { _ } from '@stores'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { COMPONENT } from '../ds'

import type { BrowserSort, Loaded, SubjectType } from '@types'
import type { Airtime, Month, OtaSnapshot, SnapshotId } from '../types'

export const NAMESPACE = `Screen${COMPONENT}`

export const DATE = new Date()

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 排序 */
  sort: 'date' as BrowserSort,

  /** 云快照 */
  ota: {} as Record<SnapshotId, OtaSnapshot>
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 类别 */
  type: MODEL_SUBJECT_TYPE.getLabel<SubjectType>('动画'),

  /** 年 */
  airtime: DATE.getFullYear() as Airtime,

  /** 月 */
  month: (DATE.getMonth() + 1) as Month,

  /** 布局 list | grid */
  layout: 'list',

  /** 是否固定 (工具栏) */
  fixed: false,

  /** 是否显示已收藏 (工具栏) */
  collected: true,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
