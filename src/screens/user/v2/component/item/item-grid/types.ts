/*
 * @Author: czy0729
 * @Date: 2025-10-23 19:38:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-13 05:16:42
 */
import type { UserCollectionsItem } from '@stores/collection/types'
import type { RenderItem } from '@types'

export type Props = RenderItem<
  UserCollectionsItem,
  {
    numColumns: number
  }
>
