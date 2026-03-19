/*
 * @Author: czy0729
 * @Date: 2024-08-02 17:02:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:03:03
 */
import { lazy } from 'react'

export const HTML = lazy(() => import('./index'))
export type { Props as HTMLProps } from './types'
