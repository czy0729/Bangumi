/*
 * @Author: czy0729
 * @Date: 2025-03-14 07:49:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 11:40:00
 *
 * 列表 key 与条目渲染
 */
import Item from '../item'

import type { RenderItem } from '@types'
import type { LogItem } from '../../types'

export function keyExtractor(item: LogItem) {
  return `${item.i}${item.d}`
}

export function renderItem({ item }: RenderItem<LogItem>) {
  return <Item {...item} />
}
