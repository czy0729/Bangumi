/*
 * @Author: czy0729
 * @Date: 2025-10-15 16:13:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-24 10:00:00
 *
 * 帖子列表 Props 与共用回调类型
 */
import type { ListViewProps } from '@components'
import type { CommentsItemWithSub } from '@stores/rakuen/types'
import type {
  HandleScrollTo,
  HandleScrollToIndexFailed,
  HandleScrollViewRef,
  HandleShowFixedTextarea
} from '../../types'

export type Props = {
  forwardRef: HandleScrollViewRef
  onScrollTo: HandleScrollTo
  onShowFixedTextarea: HandleShowFixedTextarea
  onScrollToIndexFailed: HandleScrollToIndexFailed
}

export type { HandleRenderItem } from '../../../types'

export type HandleViewableItemsChanged =
  ListViewProps<CommentsItemWithSub>['onViewableItemsChanged']
