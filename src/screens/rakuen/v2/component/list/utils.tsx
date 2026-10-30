/*
 * @Author: czy0729
 * @Date: 2024-02-04 01:09:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 板块列表 key 与渲染函数
 */
import Item from '../item'

import type { RakuenItem } from '@stores/rakuen/types'
import type { RenderItem } from '@types'

/** 条目 key: href 在单个列表内唯一, 解析不到时用下标兜底 */
export function keyExtractor(item: RakuenItem, index: number) {
  return item.href || String(index)
}

/** 渲染单个帖子条目 */
export function renderItem({ item, index }: RenderItem<RakuenItem>) {
  return <Item {...item} index={index} />
}
