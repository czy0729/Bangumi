/*
 * @Author: czy0729
 * @Date: 2025-02-12 05:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-12 05:57:04
 */
import { Fn, Navigation } from '@types'

export type Props = {
  navigation: Navigation
  onToggle: Fn
  onHeaderRefresh: Fn
  onFooterRefresh: Fn
}
