/*
 * @Author: czy0729
 * @Date: 2026-07-27 08:06:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 08:24:07
 */
import type { TextInput, TextInputSelectionChangeEvent } from 'react-native'
import type { Props as FixedTextareaProps, State as FixedTextareaState } from '../types'

export type Props = Pick<
  FixedTextareaProps,
  'simple' | 'marks' | 'source' | 'placeholder' | 'onChange' | 'onSubmit'
> &
  Pick<FixedTextareaState, 'value' | 'showSource' | 'showSourceText' | 'showTextarea'> & {
    forwardRef: (ref: { textAreaRef: TextInput }) => void
    selection: FixedTextareaState['selection']
    editing: boolean
    onFocus: () => void
    onSelectionChange: (event: TextInputSelectionChangeEvent) => void
    onAddSymbolText: (symbol: string, isText?: boolean) => void
    onToggleSource: () => void
    onToggleSourceText: () => void
  }
