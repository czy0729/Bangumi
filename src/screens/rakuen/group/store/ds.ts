/*
 * @Author: czy0729
 * @Date: 2026-10-24 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-25 10:00:00
 *
 * 页面 Store 状态定义: 持久化 / 瞬态 / 初始值
 */
import { COMPONENT } from '../ds'

import type { Group } from '@stores/rakuen/types'
import type { Loaded } from '@types'
import type { ResultData } from '@utils/kv/type'
import type { SnapshotId } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

/** 页面离开时需要还原的状态 */
export const RESET_STATE = {
  /** 头部是否固定 */
  fixed: false
}

/** 不参与持久化的瞬态状态 */
export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 云快照 */
  ota: {} as Record<SnapshotId, ResultData<Group>>
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 当前页码 */
  page: 1,

  /** 页码输入框 */
  ipt: '1',

  /** 时间是否使用最近格式 */
  showLastDate: true,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
