/*
 * @Author: czy0729
 * @Date: 2024-08-02 19:37:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:47:33
 */
import { lazy } from 'react'

export const Name = lazy(() => import('./index'))
export type { Props as NameProps } from './types'
