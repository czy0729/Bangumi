/*
 * @Author: czy0729
 * @Date: 2024-08-02 20:50:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 06:26:54
 */
import { lazy } from 'react'

export const ItemSettingBlock = lazy(() => import('./index'))
export type { IItemSettingBlock, ItemSettingBlockItemProps, ItemSettingBlockProps } from './types'
