/*
 * @Author: czy0729
 * @Date: 2026-07-27 08:07:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 08:07:06
 */
import type { Props as FixedTextareaProps, State as FixedTextareaState } from '../../types'

export type Props = Pick<
  FixedTextareaProps,
  'source' | 'marks'
> &
  Pick<
    FixedTextareaState,
    'value' | 'showSource' | 'showSourceText' | 'showTextarea'
  > & {
    onAddSymbolText: (symbol: string, isText?: boolean) => void
    onToggleSource: () => void
    onToggleSourceText: () => void
  }
