/*
 * @Author: czy0729
 * @Date: 2025-10-23 17:31:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 18:20:00
 *
 * TabBar 标签渲染
 */
import TabBarLabel from '../../../component/tab-bar-label'

import type { RenderLabelProps } from '../types'

export function renderLabel({ route, focused }: RenderLabelProps) {
  return <TabBarLabel title={route.title} focused={focused} />
}
