/*
 * @Author: czy0729
 * @Date: 2022-06-03 15:34:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-03 15:35:36
 */
import { TextInputProps } from 'react-native'
import { Override, ColorValue, ViewStyle } from '@types'

export type Props = Override<
  TextInputProps,
  {
    /** Input 容器样式 */
    style?: ViewStyle

    /** 是否启用多行 */
    multiline?: boolean

    /** 开启多行后实际使用多少行 */
    numberOfLines?: number

    /** 是否显示清空图标 */
    showClear?: boolean

    /** 清空图标颜色 */
    colorClear?: ColorValue

    /** 是否自动聚焦 */
    autoFocus?: boolean

    /** 占位文字颜色 */
    placeholderTextColor?: ColorValue

    /** 文字改变回调（待废弃，使用 onTextChange 代替） */
    onChange?: (evt: { nativeEvent: { text: string } }) => any

    /** 文字改变回调 */
    onChangeText?: (text: string) => any
  }
>
