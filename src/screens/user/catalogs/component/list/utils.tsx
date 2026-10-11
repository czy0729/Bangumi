/*
 * @Author: czy0729
 * @Date: 2026-10-11 16:45:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 16:45:26
 *
 * 列表 renderItem
 */
import { ItemCatalog } from '@_'
import { EVENT } from './ds'

import type { CatalogsItem } from '@stores/users/types'
import type { RenderItem, UserId } from '@types'

/** 渲染单个目录条目 */
export function renderItem({ item, index }: RenderItem<CatalogsItem>, userId: UserId) {
  return (
    <ItemCatalog
      {...item}
      index={index}
      isUser
      event={{
        ...EVENT,
        data: {
          userId
        }
      }}
    />
  )
}
