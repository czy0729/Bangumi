/*
 * @Author: czy0729
 * @Date: 2024-08-03 03:53:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-23 05:36:24
 */
import { lazy } from 'react'

export const TabsV2 = lazy(() => import('./index'))
export { SceneMap, TabBar, TabView } from '@components/@'

export type { Props as TabsV2Props } from './types'
