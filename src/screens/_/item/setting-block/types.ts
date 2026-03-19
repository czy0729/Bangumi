/*
 * @Author: czy0729
 * @Date: 2022-06-17 20:11:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 06:27:16
 */
import type { TextType } from '@components'
import type { ColorValue, IconfontNames, TextStyle, ViewStyle, WithViewStyles } from '@types'
import type { PropsWithChildren } from 'react'

export type ItemSettingBlockItemProps = PropsWithChildren<
  WithViewStyles<{
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
    onPress?: () => any
  }>
>

export type ItemSettingBlockProps = PropsWithChildren<
  WithViewStyles<{
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
  }>
>

export interface IItemSettingBlock {
  (props: ItemSettingBlockProps): JSX.Element
  Item?: (props: ItemSettingBlockItemProps) => JSX.Element
}
