/*
 * @Author: czy0729
 * @Date: 2024-06-02 17:19:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 列表键提取与条目渲染函数
 */
import Item from '../item'

import type { SubjectId } from '@types'
import type { RenderItem } from '@types'

export function keyExtractor(item: SubjectId) {
  return String(item)
}

export function renderItem({ item, index }: RenderItem<SubjectId, { index: number }>) {
  return <Item subjectId={item} index={index} />
}
