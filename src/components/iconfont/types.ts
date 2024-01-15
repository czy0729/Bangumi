/*
 * @Author: czy0729
 * @Date: 2022-05-03 19:27:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 16:24:26
 */
import {
  AppIconsNames,
  ColorValue,
  IconfontNames,
  IoniconsIconsNames,
  MaterialIconsNames,
  Override,
  TextStyle
} from '@types'

export { AppIconsNames, IoniconsIconsNames, MaterialIconsNames, IconfontNames }

export type Props = {
  /** 图标当成文字一样使用 */
  style?: TextStyle

  /** 图标名字，MaterialIcons 系列用 'md-' 开头，iOS 系列用 'ios-' 开头 */
  name: '' | 'bgm' | 'home' | 'trophy' | IconfontNames

  /** 大小 */
  size?: number

  /** 行高 */
  lineHeight?: number

  /** 颜色 */
  color?: ColorValue
}

export type PropsIonicons = Override<
  Props,
  {
    name: IoniconsIconsNames
  }
>

export type PropsMaterial = Override<
  Props,
  {
    name: MaterialIconsNames
  }
>
