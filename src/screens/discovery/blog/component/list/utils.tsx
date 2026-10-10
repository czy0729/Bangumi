/*
 * @Author: czy0729
 * @Date: 2026-08-31 19:46:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 列表 renderItem
 */
import { ItemBlog } from '@_'
import { EVENT } from './ds'

import type { RenderItem } from '@types'
import type { BlogItem } from '@stores/discovery/types'

export function renderItem({ item, index }: RenderItem<BlogItem>) {
  return <ItemBlog index={index} event={EVENT} {...item} />
}
