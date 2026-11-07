/*
 * @Author: czy0729
 * @Date: 2024-05-01 08:14:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 01:38:34
 *
 * 安卓 TabBar 标签渲染
 */
import TabBarLabel from '../component/tab-bar-label'

import type { RenderLabel } from '@components/nested-scroll/types'
import type { ZoneTabKey } from '../ds'

export function renderLabel({ style, title, tabKey }: Parameters<RenderLabel>[0]) {
  return <TabBarLabel style={style} title={title} tabKey={tabKey as ZoneTabKey} />
}
