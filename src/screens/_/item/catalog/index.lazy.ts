/*
 * @Author: czy0729
 * @Date: 2024-08-02 20:29:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:12:39
 */
import { lazy } from 'react'

export const ItemCatalog = lazy(() => import('./index'))
export type { Props as ItemCatalogProps } from './types'
