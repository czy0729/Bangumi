/*
 * @Author: czy0729
 * @Date: 2022-06-17 11:08:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-25 19:40:13
 */
import { _ } from '@stores'
import { EVENT } from '@constants'
import { GridStyle } from '@types'
import { Props } from './types'

export const HIT_SLOP = {
  top: _.device(2, 4),
  right: _.device(4, 4),
  bottom: _.device(10, 4),
  left: _.device(4, 4)
} as const

export const DEFAULT_PROPS = {
  navigation: {} as Props['navigation'],
  style: {} as Props['style'],
  gridStyles: {} as GridStyle,
  id: 0 as Props['id'],
  name: '' as Props['name'],
  nameCn: '' as Props['nameCn'],
  cover: '' as Props['cover'],
  score: '' as Props['score'],
  rank: '' as Props['rank'],
  typeCn: '' as Props['typeCn'],
  collection: '' as Props['collection'],
  userCollection: '' as Props['userCollection'],
  airtime: '' as Props['airtime'],
  aid: '' as Props['aid'],
  wid: '' as Props['wid'],
  mid: '' as Props['mid'],
  isCollect: false as Props['isCollect'],
  isRectangle: false as Props['isRectangle'],
  event: EVENT as Props['event']
} as const
