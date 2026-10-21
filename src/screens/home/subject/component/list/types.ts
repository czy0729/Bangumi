/*
 * @Author: czy0729
 * @Date: 2025-09-23 05:59:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-23 06:09:17
 */
import type { HandleBlockRef, HandleForwardRef, HandleScrollIntoViewIfNeeded } from '../../types'

export type Props = {
  /** 收集长列表的 ref */
  forwardRef: HandleForwardRef

  /** 滚动到指定 y 轴坐标 */
  onScrollIntoViewIfNeeded: HandleScrollIntoViewIfNeeded

  /** 收集区块锚点 ref */
  onBlockRef: HandleBlockRef
}
