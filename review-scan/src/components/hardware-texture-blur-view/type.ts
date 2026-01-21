/*
 * @Author: czy0729
 * @Date: 2023-09-04 04:18:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-09-04 04:49:15
 */
import { ReactNode, ViewStyle } from '@types'

export type HardwareTextureRootBlurViewProps = {
  style?: ViewStyle
  name?: string
  children: ReactNode
}

export type HardwareTextureBlurViewProps = {
  style?: ViewStyle
  containerStyle?: any
  name?: string
}
