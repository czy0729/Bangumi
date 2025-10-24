/*
 * @Author: czy0729
 * @Date: 2025-10-23 19:38:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-23 19:39:30
 */
import type { UserCollectionsItem } from '@stores/collection/types'
import type { RenderItem } from '@types'

export type Props = RenderItem<
  UserCollectionsItem,
  {
    page: number
  }
>
