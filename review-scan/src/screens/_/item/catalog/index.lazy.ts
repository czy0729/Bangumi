/*
 * @Author: czy0729
 * @Date: 2024-08-02 20:29:14
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-08-02 20:29:14
 */
import { lazy } from 'react'

export const ItemCatalog = lazy(() => import('./index'))
export { Props as ItemCatalogProps } from './types'
