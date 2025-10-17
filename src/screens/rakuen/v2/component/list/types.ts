/*
 * @Author: czy0729
 * @Date: 2025-10-17 09:39:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-17 09:40:36
 */
import type { ScrollToIndex } from '@components'

export type Props = {
  index: number
}

export type HandleRef = (ref: { scrollToIndex: ScrollToIndex }) => void
