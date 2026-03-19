/*
 * @Author: czy0729
 * @Date: 2024-08-02 17:08:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:05:13
 */
import { lazy } from 'react'

export const Likes = lazy(() => import('./index'))
export type { Props as LikesProps } from './types'
