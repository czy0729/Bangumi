/*
 * @Author: czy0729
 * @Date: 2024-08-03 11:51:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 14:44:37
 */
import { lazy } from 'react'

export const ErrorBoundary = lazy(() => import('./index'))
export { Props as ErrorBoundaryProps } from './types'
