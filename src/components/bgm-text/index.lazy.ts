/*
 * @Author: czy0729
 * @Date: 2024-08-02 21:27:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 21:41:16
 */
import { lazy } from 'react'

export const BgmText = lazy(() => import('./index'))
export { Props as BgmTextProps } from './types'
export { bgmMap } from './ds'
