/*
 * @Author: czy0729
 * @Date: 2026-07-27 08:08:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 08:08:18
 */
import type { Props as FixedTextareaProps, State as FixedTextareaState } from '../types'

export type Props = Pick<FixedTextareaState, 'showBgm' | 'showReplyHistory' | 'showTextarea'> & {
  simple: FixedTextareaProps['simple']
  onAddSymbolText: (symbol: string, isText?: boolean) => void
  onHideBgm: () => void
  onHideReplyHistory: () => void
  onShowBgm: () => void
  onShowReplyHistory: () => void
}
