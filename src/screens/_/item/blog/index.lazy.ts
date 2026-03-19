/*
 * @Author: czy0729
 * @Date: 2024-08-02 20:09:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 04:41:42
 */
import { lazy } from 'react'

export const ItemBlog = lazy(() => import('./index'))
export type { Props as ItemBlogProps } from './types'
