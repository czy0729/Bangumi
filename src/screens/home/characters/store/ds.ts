/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:15:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-07 05:28:27
 *
 * 更多角色页面状态声明
 */
import { _ } from '@stores'

import type { Loaded } from '@types'
import type { SnapshotId, Snapshot } from '../types'

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 筛选角色定位 (存定位标题, 空串为全部) */
  position: ''
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 云快照 */
  ota: {} as Record<SnapshotId, Snapshot>,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
