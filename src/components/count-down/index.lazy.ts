/*
 * @Author: czy0729
 * @Date: 2024-08-03 03:25:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-10 07:13:04
 */
import { lazy } from 'react'

export const CountDown = lazy(() => import('./index'))
export type { Props as CountDownProps } from './types'
