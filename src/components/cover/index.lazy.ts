/*
 * @Author: czy0729
 * @Date: 2024-08-03 03:25:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 03:27:05
 */
import { lazy } from 'react'

export const Cover = lazy(() => import('./index'))
export { Props as CoverProps } from './types'
export { getCoverSrc } from './utils'
