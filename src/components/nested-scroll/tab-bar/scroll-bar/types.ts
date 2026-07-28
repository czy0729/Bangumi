/*
 * @Author: czy0729
 * @Date: 2023-12-27 16:35:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-29 19:57:20
 */
import type { ScrollViewProps } from 'react-native'
import type { Layout } from '../../types'
export type { Layout }

export interface ScrollBarProps extends ScrollViewProps {
  /** 当前选中页码 */
  page: number
}
