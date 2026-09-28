/*
 * @Author: czy0729
 * @Date: 2026-04-20 11:04:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 列表条目渲染函数 (从条目数据展开为 Item props)
 */
import Item from '../item'

import type { RatingItem } from '@stores/subject/types'
import type { RenderItem } from '@types'

export function renderItem({ item }: RenderItem<RatingItem>) {
  return <Item {...item} />
}
