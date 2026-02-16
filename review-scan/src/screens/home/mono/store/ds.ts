/*
 * @Author: czy0729
 * @Date: 2023-04-21 18:20:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-19 22:35:29
 */
import { _ } from '@stores'
import { Mono, MonoComments } from '@stores/subject/types'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height as false | number
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

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
  ...EXCLUDE_STATE,

  /** 评论倒序 */
  reverse: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
