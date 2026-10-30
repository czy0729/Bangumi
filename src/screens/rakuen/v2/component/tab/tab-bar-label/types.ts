/*
 * @Author: czy0729
 * @Date: 2026-10-30 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * TabBar 标签属性
 */
import type { RenderLabelProps } from '../tab-bar/ds'

/** TabBar 标签属性, 只取路由与选中态 (颜色由主题控制) */
export type Props = Pick<RenderLabelProps, 'route' | 'focused'>
