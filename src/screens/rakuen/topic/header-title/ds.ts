/*
 * @Author: czy0729
 * @Date: 2022-09-28 17:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-28 17:28:21
 */
import { Navigation } from '@types'
import { StoreType as $ } from '../types'

export const IMG_WIDTH = 28

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  avatar: '' as $['avatar'],
  userId: '' as $['userId'],
  userName: '' as $['userName'],
  title: '' as $['title'],
  group: '' as $['group']
}
