/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:20:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-17 12:21:08
 */
import { EVENT } from '@constants'

export const DEFAULT_PROPS = {
  navigation: {},
  styles: {},
  id: 0,
  name: '',
  nameCn: '',
  tip: '',
  rank: '',
  score: '',
  tags: '',
  comments: '',
  time: '',
  collection: '',
  userCollection: '',
  cover: '',
  type: '',
  modify: '',
  showLabel: true,
  hideScore: false,
  isDo: false,
  isOnHold: false,
  isDropped: false,
  isCollect: false,
  isCatalog: false,
  isEditable: false,
  event: EVENT,
  onEdit: () => {}
} as const
