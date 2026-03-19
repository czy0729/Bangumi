/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:56:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:56:58
 */
import type { TextType, TouchableProps } from '@components'
import type { Fn, IconfontNames, Override, ReactNode, TextStyle, ViewStyle } from '@types'

export type Props = Override<
  TouchableProps,
  {
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
      | readonly {
          url: string
          _url?: string
          headers?: object
        }[]
    onInfoPress?: Fn
    onPress?: Fn
  }
>
