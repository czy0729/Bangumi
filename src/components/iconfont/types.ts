/*
 * @Author: czy0729
 * @Date: 2022-05-03 19:27:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-27 10:08:48
 */
import { ColorValue, TextStyle } from '@types'
import AppIcons from '../@/vector-icons/vendor/react-native-vector-icons/glyphmaps/AntDesign.json'
import IoniconsIcons from '../@/vector-icons/vendor/react-native-vector-icons/glyphmaps/Ionicons.json'
import MaterialIcons from '../@/vector-icons/vendor/react-native-vector-icons/glyphmaps/MaterialIcons.json'

export type AppIconsNames = keyof typeof AppIcons
export type IoniconsIconsNames = keyof typeof IoniconsIcons
export type MaterialIconsNames = keyof typeof MaterialIcons

export type Props = {
  /** 图标当成文字一样使用 */
  style?: TextStyle

  /** 图标名字，MaterialIcons 系列用 'md-' 开头，iOS 系列用 'ios-' 开头 */
  name: '' | AppIconsNames | IoniconsIconsNames | `md-${MaterialIconsNames}`

  /** 大小 */
  size?: number

  /** 行高 */
  lineHeight?: number

  /** 颜色 */
  color?: ColorValue
}
