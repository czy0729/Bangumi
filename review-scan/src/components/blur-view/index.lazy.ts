/*
 * @Author: czy0729
 * @Date: 2024-08-03 02:54:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 02:55:55
 */
import { lazy } from 'react'

export const BlurView = lazy(() => import('./index'))
export { Props as BlurViewProps } from './types'
export { BLURVIEW_TINT_LIGHT, BLURVIEW_TINT_DARK } from './ds'
