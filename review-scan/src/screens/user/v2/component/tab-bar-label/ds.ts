/*
 * @Author: czy0729
 * @Date: 2024-01-01 11:41:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 20:36:14
 */
import { ViewStyle } from 'react-native'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'TabBarLabel')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  style: {} as ViewStyle,
  title: '',
  count: 0,
  focused: false
}
