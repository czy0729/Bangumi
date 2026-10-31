/*
 * @Author: czy0729
 * @Date: 2025-12-24 19:03:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-31 00:00:00
 *
 * TabBar 标签渲染
 */
import TabBarLabel from '../tab-bar-label'

import type { RenderLabelProps } from './ds'

export function renderLabel({ route, focused }: RenderLabelProps) {
  return <TabBarLabel route={route} focused={focused} />
}
