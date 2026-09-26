/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:12:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-26 19:09:17
 *
 * 条目目录页面状态声明
 */
import { _ } from '@stores'

import type { Loaded } from '@types'
import type { Snapshot, SnapshotId } from '../types'

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 云快照 */
  ota: {} as Record<SnapshotId, Snapshot>,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
