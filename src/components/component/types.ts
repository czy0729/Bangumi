/*
 * @Author: czy0729
 * @Date: 2023-11-08 14:27:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-09 09:02:17
 */
import { ViewProps } from 'react-native'

export type Props = {
  /** 组件名 */
  id?: string
  style?: ViewProps['style']
  children?: ViewProps['children']
}
