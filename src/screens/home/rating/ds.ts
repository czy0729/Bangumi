/*
 * @Author: czy0729
 * @Date: 2022-09-01 10:20:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 10:20:51
 */
import { RATING_STATUS } from '@constants'
import { Loaded } from '@types'

export const NAMESPACE = 'ScreenRating'

export const STATE = {
  page: 2,

  /** 登录用户默认 true */
  isFriend: false,
  _fetching: false,
  _loaded: false as Loaded
}

export const STATUS_MAP = {
  wish: 0,
  collect: 1,
  doing: 2,
  doings: 2,
  onHold: 3,
  on_hold: 3,
  dropped: 4
} as const

export const TABS = RATING_STATUS.map(item => ({
  key: item.value,
  title: item.label
}))
