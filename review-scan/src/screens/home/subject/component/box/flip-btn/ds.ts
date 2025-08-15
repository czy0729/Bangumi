/*
 * @Author: czy0729
 * @Date: 2024-01-03 00:16:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 00:21:28
 */
import { Easing } from 'react-native-reanimated'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'FlipBtn')

export const COMPONENT_MAIN = rc(COMPONENT)

export const PERSPECTIVE = 2400

export const ANIMATED_CONFIG = {
  duration: 480,
  easing: Easing.inOut(Easing.ease)
} as const
