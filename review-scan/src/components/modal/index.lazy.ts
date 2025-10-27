/*
 * @Author: czy0729
 * @Date: 2024-08-03 03:45:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 03:47:05
 */
import { lazy } from 'react'

export const Modal = lazy(() => import('./index'))
export { Props as ModalProps } from './types'
export { ModalFixed } from './fixed'
