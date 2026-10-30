/*
 * @Author: czy0729
 * @Date: 2025-10-17 11:39:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * TabBar 标签渲染函数
 */
import TabBarLabel from '../tab-bar-label'

import type { RenderLabelProps } from './ds'

export function renderLabel({ route, focused }: RenderLabelProps) {
  return <TabBarLabel route={route} focused={focused} />
}
