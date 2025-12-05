/*
 * @Author: czy0729
 * @Date: 2024-08-03 03:53:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 04:03:53
 */
import { lazy } from 'react'

export const TabsV2 = lazy(() => import('./index'))
export { Props as TabsV2Props } from './types'
export { SceneMap } from 'react-native-tab-view'
export { TabBar } from '../@/react-native-tab-view/TabBar'
export { TabView } from '../@/react-native-tab-view/TabView'
