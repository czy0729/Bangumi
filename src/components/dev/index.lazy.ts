/*
 * @Author: czy0729
 * @Date: 2024-08-03 03:25:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 19:10:09
 */
import { lazy } from 'react'

export const DEV = lazy(() => import('./index'))
export { devLog, devLogLimit, devLogs } from './utils'
