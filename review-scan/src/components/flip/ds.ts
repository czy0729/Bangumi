/*
 * @Author: czy0729
 * @Date: 2024-01-14 15:32:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 15:54:57
 */
import { Easing } from 'react-native-reanimated'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Flip')

export const PERSPECTIVE = 2400

export const CONFIG = {
  duration: 480,
  easing: Easing.inOut(Easing.ease)
}
