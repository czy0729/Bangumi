/*
 * @Author: czy0729
 * @Date: 2024-08-03 04:05:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 04:06:21
 */
import { lazy } from 'react'

export const UserStatus = lazy(() => import('./index'))
export { Props as UserStatusProps } from './types'
export { getUserStatus } from './utils'
