/*
 * @Author: czy0729
 * @Date: 2024-08-02 16:53:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 16:30:50
 */
import { lazy } from 'react'

export const FolderManageModal = lazy(() => import('./index'))
export const CatalogFormModal = lazy(() => import('./catalog-form'))

export type { Props as FolderManageModalProps } from './types'
export type { Props as CatalogFormModalProps } from './catalog-form/types'
