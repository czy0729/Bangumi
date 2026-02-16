/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:12:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-09 10:14:35
 */
import { _ } from '@stores'
import { Loaded } from '@types'
import { SnapshotId } from '../types'

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
  ota: {} as Record<SnapshotId, any>,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
