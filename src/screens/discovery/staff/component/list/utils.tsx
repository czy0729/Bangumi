/*
 * @Author: czy0729
 * @Date: 2024-04-05 13:05:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-23 19:15:11
 *
 * 列表 renderItem
 */
import { ItemCatalog } from '@_'
import { EVENT } from './ds'

import type { CatalogsItem } from '@stores/users/types'
import type { RenderItem, UserId } from '@types'

/** 渲染单个目录条目 */
export function renderItem(
  { item, index }: RenderItem<CatalogsItem>,
  userId: UserId,
  userName: string
) {
  return (
    <ItemCatalog
      {...item}
      index={index}
      name={userName}
      anime={item.anime}
      event={{
        ...EVENT,
        data: {
          userId
        }
      }}
    />
  )
}
