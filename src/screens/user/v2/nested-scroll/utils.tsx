/*
 * @Author: czy0729
 * @Date: 2025-10-23 10:49:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 18:20:00
 *
 * 安卓 TabBar 标签渲染
 */
import TabBarLabel from '../component/tab-bar-label'

import type { RenderLabel } from '@components/nested-scroll/types'
import type { TabsLabel } from '../types'

export function renderLabel({ style, title }: Parameters<RenderLabel>[0]) {
  // header 的 pages 固定为 TABS, title 一定是收藏状态文案
  return <TabBarLabel style={style} title={title as TabsLabel} />
}
