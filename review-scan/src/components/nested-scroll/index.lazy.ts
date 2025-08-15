/*
 * @Author: czy0729
 * @Date: 2024-08-03 03:45:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 03:51:36
 */
import { lazy } from 'react'

export const LazyLoadView = lazy(() => import('./lazy-load-view'))
export const NestedScrollParallaxHeader = lazy(() => import('./nested-scroll-parallax-header'))
export { Props as NestedScrollParallaxHeaderProps } from './nested-scroll-parallax-header/types'
