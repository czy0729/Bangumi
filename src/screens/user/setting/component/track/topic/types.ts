/*
 * @Author: czy0729
 * @Date: 2026-07-24 21:18:22
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-07-24 21:18:22
 */
import type { WithNavigation } from '@types'
import type { WithFilterProps } from '../../../types'

export type Props = WithNavigation<
  WithFilterProps<{
    setFalse: () => void
  }>
>
