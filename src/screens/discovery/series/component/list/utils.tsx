/*
 * @Author: czy0729
 * @Date: 2024-04-02 17:28:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 19:54:51
 */
import Item from '../item'

import type { RenderItem, SubjectId } from '@types'

/** 以分组内容作为唯一标识 */
export function keyExtractor(item: SubjectId[]) {
  return item.join('|')
}

export function renderItem({ item, index }: RenderItem<SubjectId[]>) {
  return <Item item={item} index={index} />
}
