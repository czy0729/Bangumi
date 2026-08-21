/*
 * @Author: czy0729
 * @Date: 2025-09-23 05:59:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-23 06:09:17
 */
import type { HandleBlockRef, HandleForwardRef, HandleScrollIntoViewIfNeeded } from '../../types'

export type Props = {
  forwardRef: HandleForwardRef
  onScrollIntoViewIfNeeded: HandleScrollIntoViewIfNeeded
  onBlockRef: HandleBlockRef
}
