/*
 * @Author: czy0729
 * @Date: 2022-05-03 19:27:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-19 07:37:00
 */
import type {
  AppIconsNames,
  ColorValue,
  IconfontNames,
  IoniconsIconsNames,
  MaterialIconsNames,
  Override,
  TextStyle
} from '@types'

export type { AppIconsNames, IoniconsIconsNames, MaterialIconsNames, IconfontNames }

/** 图标家族 */
export type IconFamily = 'material' | 'ionicons' | 'app'

/** Iconfont 图标属性 */
export type Props = {
  /** 图标当成文字一样使用 */
  style?: TextStyle

  /** 图标名，Material 系列用 'md-' 开头，iOS 系列用 'ios-' 开头 */
  name: '' | 'bgm' | 'home' | 'trophy' | IconfontNames

  /** 图标大小，默认 22 */
  size?: number

  /** 行高，默认等于 size */
  lineHeight?: number

  /** 颜色，默认使用主题色 */
  color?: ColorValue

  /** 是否显示阴影 */
  shadow?: boolean
}

/** Ionicons 图标属性（name 以 'ios-' 开头） */
export type PropsIonicons = Override<
  Props,
  {
    /** Ionicons 图标名，如 'ios-heart'、'ios-home' */
    name: IoniconsIconsNames
  }
>

/** Material Icons 属性（name 以 'md-' 开头） */
export type PropsMaterial = Override<
  Props,
  {
    /** Material 图标名，如 'md-heart'、'md-home' */
    name: MaterialIconsNames
  }
>
