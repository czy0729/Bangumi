/*
 * @Author: czy0729
 * @Date: 2023-11-08 14:27:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-10 10:21:55
 */
import { ViewProps } from 'react-native'

export type Props = {
  /** 组件名, 至少需要有一横杠, 不然可能会被 react 认为你是写错的 */
  id: `${'component' | 'base' | 'item' | 'icon' | 'screen'}-${string}` | 'div'
  'data-title'?: string
  style?: ViewProps['style']
  children?: ViewProps['children']
}
