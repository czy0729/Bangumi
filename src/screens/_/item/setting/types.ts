/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:56:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-21 18:40:53
 */
import { TouchableProps, TextType } from '@components'
import { Override, ViewStyle, ReactNode, TextStyle, IconfontNames } from '@types'

export type Props = Override<
  TouchableProps,
  {
    style?: ViewStyle
    show?: boolean
    hd?: string
    ft?: ReactNode | string
    arrow?: boolean
    arrowStyle?: TextStyle
    arrowIcon?: IconfontNames
    arrowSize?: number
    information?: string
    informationType?: TextType
    thumb?: string
    children?: any
    onPress?: (event?: any) => any
  }
>
