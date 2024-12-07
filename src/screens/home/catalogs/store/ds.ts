/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:12:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-09 10:14:35
 */
import { _ } from '@stores'
import { Loaded } from '@types'
import { SnapshotId } from '../types'

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const STATE = {
  /** 云快照 */
  ota: {} as Record<SnapshotId, any>,

  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
