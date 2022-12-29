/*
 * @Author: czy0729
 * @Date: 2022-07-30 03:42:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 04:12:21
 */
import { MODEL_TAG_ORDERBY } from '@constants'
import { RatingStatus, TagOrder } from '@types'

export const NAMESPACE = 'ScreenTag'

export const DEFAULT_ORDER = MODEL_TAG_ORDERBY.getValue<TagOrder>('标注数')

export const EXCLUDE_STATE = {
  /** 年 */
  airtime: '',

  /** 月 */
  month: '',

  /** 用于列表置顶 */
  hide: false,

  /** 收藏管理框 */
  modal: {
    visible: false,
    subjectId: 0,
    title: '',
    desc: '',
    status: '' as '' | RatingStatus,
    action: '听' as '看' | '玩' | '听' | '读'
  },

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
  _loaded: false
}
