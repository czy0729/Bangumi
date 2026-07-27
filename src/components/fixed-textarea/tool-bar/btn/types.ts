/*
 * @Author: czy0729
 * @Date: 2026-07-27 08:08:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 09:00:22
 */
import type { Props as ToolBarProps } from '../types'

export type Props = Pick<
  ToolBarProps,
  | 'showBgm'
  | 'showReplyHistory'
  | 'onHideBgm'
  | 'onHideReplyHistory'
  | 'onShowBgm'
  | 'onShowReplyHistory'
  | 'onAddSymbolText'
> & {
  text: string
  symbol?: string
}
