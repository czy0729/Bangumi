/*
 * @Author: czy0729
 * @Date: 2024-08-03 12:03:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 12:06:03
 */
import { lazy } from 'react'

export const StorybookSPA = lazy(() => import('./spa'))
export const StorybookPage = lazy(() => import('./page'))
export const StorybookList = lazy(() => import('./list'))
export const StorybookGrid = lazy(() => import('./grid'))
export const StorybookScroll = lazy(() => import('./scroll'))
export const StorybookScrollToTop = lazy(() => import('./scroll-top-top'))
export { StorybookNavigation, getStorybookRoute, getStorybookArgs } from './navigation'
export { StorybookState } from './state'
