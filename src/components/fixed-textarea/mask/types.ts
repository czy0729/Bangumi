/*
 * @Author: czy0729
 * @Date: 2026-07-27 08:05:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 08:24:35
 */
import type { State as FixedTextareaState } from '../types'

export type Props = Pick<FixedTextareaState, 'showTextarea' | 'showBgm'> & {
  onMask: () => void
}
