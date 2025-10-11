/*
 * @Author: czy0729
 * @Date: 2024-08-02 20:50:20
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-08-02 20:50:20
 */
import { lazy } from 'react'

export const ItemSettingBlock = lazy(() => import('./index'))
export { IItemSettingBlock, ItemSettingBlockItemProps, ItemSettingBlockProps } from './types'
