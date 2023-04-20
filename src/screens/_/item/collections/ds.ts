/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:20:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 20:34:53
 */
import { EVENT } from '@constants'
import { Navigation } from '@types'
import { memoStyles } from './styles'
import { Props } from './types'

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
  userCollection: '' as Props['userCollection'],
  cover: '' as Props['cover'],
  type: '' as Props['type'],
  numberOfLines: 2 as Props['numberOfLines'],
  modify: '' as Props['modify'],
  showLabel: true as Props['showLabel'],
  hideScore: false as Props['hideScore'],
  isDo: false as Props['isDo'],
  isOnHold: false as Props['isOnHold'],
  isDropped: false as Props['isDropped'],
  isCollect: false as Props['isCollect'],
  isCatalog: false as Props['isCatalog'],
  isEditable: false as Props['isEditable'],
  event: EVENT as Props['event'],
  filter: '' as Props['filter'],
  showManage: false as Props['showManage'],
  onEdit: (() => {}) as Props['onEdit']
} as const
