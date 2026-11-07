/*
 * @Author: czy0729
 * @Date: 2025-09-14 04:29:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-14 04:29:57
 */
import type { CollectionsItem } from '@stores/user/types'
import type { CollectionStatusCn } from '@types'

export type Props = {
  /** 该状态下的收藏条目 */
  item: Pick<CollectionsItem, 'list'>

  /** 收藏状态 */
  status: CollectionStatusCn
}
