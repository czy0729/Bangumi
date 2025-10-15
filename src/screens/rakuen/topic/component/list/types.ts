/*
 * @Author: czy0729
 * @Date: 2025-10-15 16:13:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-15 16:19:16
 */
import type {
  HandleScrollToIndexFailed,
  HandleScrollViewRef,
  HandleShowFixedTextarea
} from '../../types'

export type Props = {
  forwardRef: HandleScrollViewRef
  onShowFixedTextarea: HandleShowFixedTextarea
  onScrollToIndexFailed: HandleScrollToIndexFailed
}
