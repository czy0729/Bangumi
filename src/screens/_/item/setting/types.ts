/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:56:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-23 16:49:57
 */
import { TouchableProps, TextType } from '@components'
import { Override, ViewStyle, ReactNode, TextStyle, IconfontNames } from '@types'

export type Props = Override<
  TouchableProps,
  {
    style?: ViewStyle
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
    thumb?:
      | false
      | {
          url: string
          _url?: string
          headers?: object
        }[]
    children?: any
    onPress?: (event?: any) => any
  }
>
