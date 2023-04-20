/*
 * @Author: czy0729
 * @Date: 2022-07-20 14:30:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 17:42:40
 */
import { _ } from '@stores'
import { Mono, MonoComments } from '@stores/subject/types'

export const NAMESPACE = 'ScreenMono'

export const COVER_WIDTH = _.r(64)

export const COVER_HEIGHT = COVER_WIDTH * 1.28

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** 是否需要检查是否进行过 ICO (XSB) */
  checkTinygrail: false,

  /** 展开的子楼层 id */
  expands: [],

  /** 翻译缓存 */
  translateResult: [],
  translateResultDetail: [],

  /** 楼层翻译缓存 */
  translateResultFloor: {},

  /** 云端人物快照 */
  mono: {
    _loaded: 0
  } as Mono,

  /** 云端人物评论快照 */
  comments: {
    list: [],
    pagination: {
      page: 0,
      pageTotal: 0
    },
    _loaded: 0
  } as MonoComments
}

export const STATE = {
  /** 评论倒序 */
  reverse: false,

  ...EXCLUDE_STATE,
  _loaded: false
}
