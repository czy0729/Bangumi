/*
 * @Author: czy0729
 * @Date: 2024-08-02 20:09:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:54:31
 */
import { lazy } from 'react'

export const ItemArticle = lazy(() => import('./index'))
export type { Props as ItemArticleProps } from './types'
