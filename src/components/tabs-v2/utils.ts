/*
 * @Author: czy0729
 * @Date: 2026-08-18 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 10:00:00
 */
import type { ReactNode } from 'react'

import type { Route } from './types'

/** 计算单个 Tab 宽度: 数量达到 10 及以上按固定比例, 否则均分窗口宽度; 空路由回退整宽避免除零 */
export const getTabWidth = (length: number, windowWidth: number) =>
  length >= 10 ? windowWidth / 3.6 : windowWidth / (length || 1)

/** 由路由与渲染函数构建 SceneMap 场景表 */
export const createScenes = <T extends Route>(
  routes: readonly T[],
  renderItem: (item: T, index?: number) => ReactNode
): Record<string, () => ReactNode> => {
  const map: Record<string, () => ReactNode> = {}
  routes.forEach((route, index) => {
    map[route.key] = () => renderItem(route, index)
  })
  return map
}
