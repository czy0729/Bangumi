import { _ } from '@stores'
/*
 * @Author: czy0729
 * @Date: 2025-03-04 19:19:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-07 17:55:15
 */
import { Loaded, UserId } from '@types'
import { COLORS, COMPONENT } from '../ds'
import { DataItem, DetailItem, LikesItem } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** 发送中 */
  fetching: false,

  /** 显示输入框 */
  show: false
}

export const STATE = {
  text: '',
  color: COLORS[0] as string,
  monoId: '',

  data: {
    list: [] as DataItem[],
    _loaded: false as Loaded
  },

  detail: {} as Record<string, DetailItem>,

  likes: {} as Record<
    UserId,
    {
      list: LikesItem[]
      ts: number
    }
  >,

  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
