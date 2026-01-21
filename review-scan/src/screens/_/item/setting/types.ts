/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:56:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-12 15:59:19
 */
import { TextType, TouchableProps } from '@components'
import { Fn, IconfontNames, Override, ReactNode, TextStyle, ViewStyle } from '@types'

export type Props = Override<
  TouchableProps,
  {
    style?: ViewStyle
    contentStyle?: ViewStyle
    show?: boolean
    hd?: ReactNode | string
    hdSize?: number
    ft?: ReactNode | string
    arrow?: boolean
    arrowStyle?: TextStyle
    arrowIcon?: IconfontNames
    arrowSize?: number
    information?: string
    informationType?: TextType
    filter?: string

    /** 是否二级关联设置 */
    sub?: boolean
    thumb?:
      | false
      | {
          url: string
          _url?: string
          headers?: object
        }[]
    children?: any
    onInfoPress?: Fn
    onPress?: Fn
  }
>
