/*
 * @Author: czy0729
 * @Date: 2022-07-30 03:42:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * NAMESPACE / RESET_STATE / EXCLUDE_STATE / STATE
 */
import { _ } from '@stores'
import { MODEL_TAG_ORDERBY } from '@constants'
import { COMPONENT } from '../ds'

import type { Tag } from '@stores/tag/types'
import type { ResultData } from '@utils/kv/type'
import type { Loaded, TagOrder } from '@types'
import type { SnapshotId } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 年 */
  airtime: '',

  /** 月 */
  month: '',

  /** 公共标签 */
  meta: false,

  /** 用于列表置顶 */
  hide: false,

  /** 云快照 */
  ota: {} as Record<SnapshotId, ResultData<Tag>>
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 排序 */
  order: MODEL_TAG_ORDERBY.getValue<TagOrder>('收藏'),

  /** 布局 */
  list: true,

  /** 是否固定 (工具条) */
  fixed: false,

  /** 是否显示收藏 (工具条) */
  collected: true,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
