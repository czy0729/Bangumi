/*
 * @Author: czy0729
 * @Date: 2026-10-24 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-24 10:00:00
 *
 * 页面 Store 状态定义
 */
import { COMPONENT } from '../ds'

import type { Board } from '@stores/rakuen/types'
import type { Loaded } from '@types'
import type { ResultData } from '@utils/kv/type'
import type { SnapshotId } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const STATE = {
  /** 云快照 */
  ota: {} as Record<SnapshotId, ResultData<Board>>,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
