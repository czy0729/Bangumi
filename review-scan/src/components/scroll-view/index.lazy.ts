/*
 * @Author: czy0729
 * @Date: 2024-08-03 03:53:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 03:59:56
 */
import { lazy } from 'react'

export const ScrollView = lazy(() => import('./index'))
export { Props as ScrollViewProps, ScrollTo } from './types'
