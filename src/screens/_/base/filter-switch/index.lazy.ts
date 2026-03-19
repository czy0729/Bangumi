/*
 * @Author: czy0729
 * @Date: 2024-08-02 16:42:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 16:20:18
 */
import { lazy } from 'react'

export const FilterSwitch = lazy(() => import('./index'))
export { getLastPath } from './utils'
export type { Props as FilterSwitchProps } from './types'
