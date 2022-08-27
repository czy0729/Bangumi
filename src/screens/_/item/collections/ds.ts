/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:20:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 20:19:42
 */
import { EVENT } from '@constants'
import { Navigation } from '@types'
import { memoStyles } from './styles'
import { Props } from './types'

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  id: 0 as Props['id'],
  name: '' as Props['name'],
  nameCn: '' as Props['nameCn'],
  tip: '' as Props['tip'],
  rank: '' as Props['rank'],
  score: '' as Props['score'],
  tags: '' as Props['tags'],
  comments: '' as Props['comments'],
  time: '' as Props['time'],
  collection: '' as Props['collection'],
  userCollection: '' as Props['userCollection'],
  cover: '' as Props['cover'],
  type: '' as Props['type'],
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
  onEdit: (() => {}) as Props['onEdit'],
  onManagePress: undefined as Props['onManagePress']
} as const
