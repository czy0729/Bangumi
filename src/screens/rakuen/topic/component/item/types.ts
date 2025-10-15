/*
 * @Author: czy0729
 * @Date: 2025-10-15 04:59:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-15 05:04:36
 */
import type { CommentsItemWithSub } from '@stores/rakuen/types'
import type { RenderItem } from '@types'
import type { HandleShowFixedTextarea } from '../../types'

export type Props = RenderItem<
  CommentsItemWithSub,
  {
    onShowFixedTextarea: HandleShowFixedTextarea
  }
>
