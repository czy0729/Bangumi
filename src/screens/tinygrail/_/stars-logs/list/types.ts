/*
 * @Author: czy0729
 * @Date: 2025-02-12 05:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-09 09:27:14
 */
import type { Fn, WithNavigation } from '@types'

export type Props = WithNavigation<{
  onToggle: Fn
  onHeaderRefresh: Fn
  onFooterRefresh: Fn
}>
