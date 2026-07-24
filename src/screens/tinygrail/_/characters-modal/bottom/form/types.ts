/*
 * @Author: czy0729
 * @Date: 2026-07-24 22:56:46
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-07-24 22:56:46
 */
import type { Props as SearchInputProps } from '../../search-input/types'

export type Props = Pick<SearchInputProps, 'onFocus' | 'onBlur' | 'onChangeText'> & {
  amount?: number
}
