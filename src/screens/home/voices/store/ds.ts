/*
 * @Author: czy0729
 * @Date: 2022-09-01 11:01:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 22:17:12
 */
import { _ } from '@stores'
import { COMPONENT } from '../ds'

import type { MonoVoices } from '@stores/subject/types'
import type { ResultData } from '@utils/kv/type'
import type { Loaded, MonoVoicesInnerOrderby, MonoVoicesOuterOrderby } from '@types'
import type { SnapshotId, Status } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 默认全部 */
  position: '',

  /** 收藏状态 */
  status: '全部' as Status,

  /** 云快照 */
  ota: {} as Record<SnapshotId, ResultData<MonoVoices>>
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 外层排序（角色排序） */
  outerOrder: '' as MonoVoicesOuterOrderby,

  /** 内层排序（条目排序） */
  innerOrder: '' as MonoVoicesInnerOrderby,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
