/*
 * @Author: czy0729
 * @Date: 2022-07-30 03:42:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 10:31:42
 */
import { _ } from '@stores'
import { MODEL_TAG_ORDERBY } from '@constants'
import { Loaded, TagOrder } from '@types'

export const NAMESPACE = 'ScreenTag'

export const DEFAULT_ORDER = MODEL_TAG_ORDERBY.getValue<TagOrder>('标注数')

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** 年 */
  airtime: '',

  /** 月 */
  month: '',

  /** 用于列表置顶 */
  hide: false,

  /** 云快照 */
  ota: {}
}

export const STATE = {
  /** 排序 */
  order: DEFAULT_ORDER,

  /** 布局 */
  list: true,

  /** 是否固定 (工具条) */
  fixed: false,

  /** 是否显示收藏 (工具条) */
  collected: true,
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
