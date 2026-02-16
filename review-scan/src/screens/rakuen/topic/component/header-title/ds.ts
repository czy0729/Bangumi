/*
 * @Author: czy0729
 * @Date: 2022-09-28 17:26:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-06 21:36:01
 */
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { Fn, Navigation } from '@types'
import { Ctx } from '../../types'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'HeaderTitle')

export const COMPONENT_MAIN = rc(COMPONENT)

export const IMG_WIDTH = 28

type $ = Ctx['$']

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  avatar: '' as $['avatar'],
  userId: '' as $['userId'],
  userName: '' as $['userName'],
  title: '' as $['title'],
  group: '' as $['group'],
  onScrollToTop: FROZEN_FN as Fn
}
