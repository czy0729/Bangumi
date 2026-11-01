/*
 * @Author: czy0729
 * @Date: 2026-11-01 15:11:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 15:11:18
 *
 * 列表行渲染
 */
import { ItemBlog } from '@_'
import { EVENT } from './ds'

import type { RenderItem } from '@types'
import type { BlogsItem } from '@stores/users/types'

export function renderItem({ item, index }: RenderItem<BlogsItem>) {
  return <ItemBlog event={EVENT} index={index} {...item} />
}
