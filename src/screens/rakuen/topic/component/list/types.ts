/*
 * @Author: czy0729
 * @Date: 2025-10-15 16:13:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-16 20:11:49
 */
import type { ReactElement } from 'react'
import type { ListViewProps } from '@components'
import type { CommentsItemWithSub } from '@stores/rakuen/types'
import type { RenderItem } from '@types'
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

export type HandleRenderItem = (args: RenderItem<CommentsItemWithSub>) => ReactElement | null

export type HandleViewableItemsChanged =
  ListViewProps<CommentsItemWithSub>['onViewableItemsChanged']
