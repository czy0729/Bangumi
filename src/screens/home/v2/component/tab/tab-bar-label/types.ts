/*
 * @Author: czy0729
 * @Date: 2026-08-19 05:33:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-19 05:35:28
 */
import type { RenderLabelProps } from '../tab-bar/types'

/** Tab 标签属性 */
export type Props = Pick<RenderLabelProps, 'route' | 'focused'>
