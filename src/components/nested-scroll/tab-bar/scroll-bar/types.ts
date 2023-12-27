/*
 * @Author: czy0729
 * @Date: 2023-12-27 16:35:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-27 16:36:49
 */
import { ScrollViewProps } from 'react-native'

export interface ScrollBarProps extends ScrollViewProps {
  page: number
}

export interface Layout {
  x: number
  y: number
  width: number
  height: number
}
