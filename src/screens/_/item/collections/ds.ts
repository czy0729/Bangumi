/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:20:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-24 06:01:55
 */
import { rc } from '@utils/dev'
import { EVENT, FROZEN_FN, IMG_HEIGHT, IMG_WIDTH } from '@constants'
import { Navigation } from '@types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'
import { Props } from './types'

export const COMPONENT = rc(PARENT, 'ItemCollections')

export const COMPONENT_MAIN = rc(COMPONENT)

export const ITEM_HEIGHT = 156

export const COVER_WIDTH = Math.floor(IMG_WIDTH * 1.1)

export const COVER_HEIGHT = Math.floor(IMG_HEIGHT * 1.1)

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  index: 0 as number,
  inViewY: 0 as number,
  id: 0 as Props['id'],
  name: '' as Props['name'],
  nameCn: '' as Props['nameCn'],
  tip: '' as Props['tip'],
  rank: '' as Props['rank'],
  score: '' as Props['score'],
  total: '' as Props['total'],
  simpleStars: false as Props['simpleStars'],
  tags: '' as Props['tags'],
  comments: '' as Props['comments'],
  time: '' as Props['time'],
  collection: '' as Props['collection'],
  cover: '' as Props['cover'],
  type: '' as Props['type'],
  numberOfLines: 2 as Props['numberOfLines'],
  modify: '' as Props['modify'],
  showLabel: true as Props['showLabel'],
  hideScore: false as Props['hideScore'],
  relatedId: 0 as Props['relatedId'],
  isDo: false as Props['isDo'],
  isOnHold: false as Props['isOnHold'],
  isDropped: false as Props['isDropped'],
  isCollect: false as Props['isCollect'],
  isCatalog: false as Props['isCatalog'],
  isEditable: false as Props['isEditable'],
  event: EVENT as Props['event'],
  filter: '' as Props['filter'],
  showManage: false as Props['showManage'],
  touchPosition: 'outer' as Props['touchPosition'],
  onEdit: FROZEN_FN as Props['onEdit']
} as const
