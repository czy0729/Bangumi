/*
 * @Author: czy0729
 * @Date: 2022-06-17 11:08:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-17 11:08:51
 */
import { _ } from '@stores'
import { EVENT } from '@constants'

export const HIT_SLOP = {
  top: _.device(2, 4),
  right: _.device(4, 4),
  bottom: _.device(10, 4),
  left: _.device(4, 4)
} as const

export const DEFAULT_PROPS = {
  navigation: {},
  style: {},
  gridStyles: {},
  id: 0,
  name: '',
  nameCn: '',
  cover: '',
  score: '',
  rank: '',
  typeCn: '',
  collection: '',
  userCollection: '',
  airtime: '',
  aid: '',
  wid: '',
  mid: '',
  isCollect: false,
  isRectangle: false,
  event: EVENT
} as const
