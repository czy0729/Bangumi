/*
 * @Author: czy0729
 * @Date: 2026-10-27 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-27 00:00:00
 */
import { pad } from '@utils'
import { HOST_BGM_STATIC } from '@constants'
import Item from '../item'

import type { RenderItem } from '@types'
import type { ItemData } from './types'

export function keyExtractor(item: ItemData) {
  return String(item.id ?? '')
}

/** 生成列表项渲染函数, 已加入标记在列表层统一计算 */
export function createRenderItem(joinedIds: Set<number>) {
  return ({ item }: RenderItem<ItemData>) => (
    <Item {...item} joined={!!item.id && joinedIds.has(Number(item.id))} />
  )
}

/** 静态数据的小组封面地址 */
export function getCoverById(id: number): string {
  if (!id) return ''

  const h = String(Math.floor(id / 100))
  return `${HOST_BGM_STATIC}/pic/icon/m/000/00/${pad(h)}/${id}.jpg`
}

/** 封面地址中的数字 id */
export function getGroupId(cover?: string) {
  const match = String(cover || '').match(/\/(\d+)\.jpg/)
  return match ? Number(match[1]) : 0
}
