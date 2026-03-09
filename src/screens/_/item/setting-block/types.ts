/*
 * @Author: czy0729
 * @Date: 2022-06-17 20:11:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-09 23:19:51
 */
import type { TextType } from '@components'
import type { ColorValue, IconfontNames, TextStyle, ViewStyle } from '@types'

export type ItemSettingBlockItemProps = {
  style?: ViewStyle
  itemStyle?: ViewStyle
  show?: boolean
  active?: boolean
  icon?: IconfontNames
  iconStyle?: TextStyle
  iconColor?: ColorValue
  title?: string
  titleSize?: number
  information?: string
  informationType?: TextType
  filter?: string
  children?: any
  onPress?: () => any
}

export type ItemSettingBlockProps = {
  style?: ViewStyle
  show?: boolean
  title?: string
  information?: string
  informationType?: TextType
  size?: number
  filter?: string

  /** 是否二级关联设置 */
  sub?: boolean
  subStyle?: ViewStyle
  thumb?:
    | false
    | {
        url: string
        _url?: string
        headers?: object
      }[]
  url?: string
  align?: any
  children?: any
}

export interface IItemSettingBlock {
  (props: ItemSettingBlockProps): JSX.Element
  Item?: (props: ItemSettingBlockItemProps) => JSX.Element
}
