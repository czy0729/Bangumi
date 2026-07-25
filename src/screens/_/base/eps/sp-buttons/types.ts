/*
 * @Author: czy0729
 * @Date: 2026-07-25 18:48:06
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-07-25 18:48:06
 */
import type { Ep } from '@stores/subject/types'
import type { PassProps } from '../types'

export type Props = {
  props: PassProps
  eps: readonly Ep[]
  preNum: number
}
