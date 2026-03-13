/*
 * @Author: czy0729
 * @Date: 2022-05-28 05:41:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 15:51:16
 */
import { FlexPropsType } from '@ant-design/react-native/lib/flex/PropsType'
import { Fn, Override, ViewStyle } from '@types'
import { ComponentProps } from '../component'

export type Props = Override<
  FlexPropsType,
  {
    id?: ComponentProps['id']
    style?: ViewStyle
    flex?: number
    pointerEvents?: any
    onLayout?: Fn
  }
>
