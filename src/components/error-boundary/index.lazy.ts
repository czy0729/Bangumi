/*
 * @Author: czy0729
 * @Date: 2024-08-03 11:51:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 04:49:43
 */
import { lazy } from 'react'

export const ErrorBoundary = lazy(() => import('./index'))
export type { Props as ErrorBoundaryProps } from './types'
