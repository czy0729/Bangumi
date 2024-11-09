/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:12:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-09 10:14:35
 */
import { Loaded } from '@types'
import { SnapshotId } from '../types'

export const STATE = {
  /** 云快照 */
  ota: {} as Record<SnapshotId, any>,
  _loaded: false as Loaded
}
