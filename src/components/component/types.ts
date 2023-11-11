/*
 * @Author: czy0729
 * @Date: 2023-11-08 14:27:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-10 00:19:19
 */
import { ViewProps } from 'react-native'

export type Props = {
  /** 组件名, 至少需要有一横杠, 不然可能会被 react 认为你是写错的 */
  id: `${'component' | 'base' | 'item' | 'icon' | 'screen'}-${string}`
  style?: ViewProps['style']
  children?: ViewProps['children']
}
