/*
 * @Author: czy0729
 * @Date: 2026-07-27 08:11:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 09:05:04
 */
import type { Props as FixedTextareaProps, State as FixedTextareaState } from '../../../types'

export type Props = Pick<FixedTextareaProps, 'marks'> &
  Pick<FixedTextareaState, 'showSource' | 'showSourceText'> & {
    onAddSymbolText: (symbol: string, isText?: boolean) => void
  }
