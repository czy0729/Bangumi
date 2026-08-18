/*
 * @Author: czy0729
 * @Date: 2026-08-19 05:33:50
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-19 05:33:50
 */
import TabBarLabel from '../tab-bar-label'

import type { RenderLabelProps } from './types'

/** 渲染 Tab 标签 */
export function renderLabel({ route, focused }: RenderLabelProps) {
  return <TabBarLabel route={route} focused={focused} />
}
