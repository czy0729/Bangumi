/*
 * @Author: czy0729
 * @Date: 2022-06-06 05:37:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 20:43:53
 */
import { Animated } from 'react-native'
import { rc } from '@utils/dev'
import { ImagesAvatar, Navigation, UserId } from '@types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'ParallaxImage')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DATA_ME = [
  '我的空间',
  '我的好友',
  '我的人物',
  '我的目录',
  '我的日志',
  '我的词云',
  '我的时间线',
  '我的netaba.re'
] as const

export const DATA_OTHER = ['TA的好友', 'TA的netaba.re'] as const

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  themeStyles: {} as ReturnType<typeof memoStyles>,
  parallaxImageHeight: 0 as number,
  avatar: {} as ImagesAvatar,
  bg: '' as string,
  bgAvatar: '' as string,
  fixed: false as boolean,
  id: '' as UserId,
  myUserId: '' as UserId,
  nickname: '' as string,
  paramsUserId: '' as UserId,
  scrollY: new Animated.Value(0),
  src: '' as string,
  textType: 'plain' as 'plain' | 'title',
  userId: '' as UserId,
  username: '' as string
} as const
