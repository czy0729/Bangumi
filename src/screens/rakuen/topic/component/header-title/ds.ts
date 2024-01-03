/*
 * @Author: czy0729
 * @Date: 2022-09-28 17:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 20:44:11
 */
import { rc } from '@utils/dev'
import { Navigation } from '@types'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'HeaderTitle')

export const COMPONENT_MAIN = rc(COMPONENT)

export const IMG_WIDTH = 28

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  avatar: '' as $['avatar'],
  userId: '' as $['userId'],
  userName: '' as $['userName'],
  title: '' as $['title'],
  group: '' as $['group']
}
