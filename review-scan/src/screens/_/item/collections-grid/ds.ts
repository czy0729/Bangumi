/*
 * @Author: czy0729
 * @Date: 2022-06-17 11:08:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 04:17:38
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { EVENT } from '@constants'
import { GridStyle } from '@types'
import { COMPONENT as PARENT } from '../ds'
import { Props } from './types'

export const COMPONENT = rc(PARENT, 'ItemCollectionsGrid')

export const COMPONENT_MAIN = rc(COMPONENT)

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
  sub: '' as Props['sub'],
  cover: '' as Props['cover'],
  cdn: true as Props['cdn'],
  score: '' as Props['score'],
  rank: '' as Props['rank'],
  typeCn: '' as Props['typeCn'],
  collection: '' as Props['collection'],
  userCollection: '' as Props['userCollection'],
  airtime: '' as Props['airtime'],
  aid: '' as Props['aid'],
  wid: '' as Props['wid'],
  mid: '' as Props['mid'],
  isRectangle: false as Props['isRectangle'],
  hideScore: undefined,
  event: EVENT as Props['event']
} as const
