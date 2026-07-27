/*
 * @Author: czy0729
 * @Date: 2026-07-27 08:02:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 09:08:50
 */
import type { State as FixedTextareaState, Props as FixedTextareaProps } from '../types'

export type Props = Pick<
  FixedTextareaState,
  | 'keyboardHeight'
  | 'history'
  | 'replyHistory'
  | 'lockHistory'
  | 'showTextarea'
  | 'showBgm'
  | 'showReplyHistory'
  | 'emojisGroupSelectedIndex'
> & {
  onChange: FixedTextareaProps['onChange']
  onSelectBgm: (key: string | number, updateRecent?: boolean) => void
  onLockHistory: (text: string) => void
  onEmojisGroupChange: (label: string) => void
}

export type EmojisItem = {
  title: string
  data: Record<number, string>
  desc: Record<number, string> | null
}
