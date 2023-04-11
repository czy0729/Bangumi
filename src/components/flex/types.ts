/*
 * @Author: czy0729
 * @Date: 2022-05-28 05:41:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 12:58:19
 */
import { FlexPropsType } from '@ant-design/react-native/lib/flex/PropsType'
import { Override, ViewStyle } from '@types'

export type Props = Override<
  FlexPropsType,
  {
    style?: ViewStyle
    flex?: number
    pointerEvents?: any
  }
>
