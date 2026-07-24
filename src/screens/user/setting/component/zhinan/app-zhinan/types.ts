/*
 * @Author: czy0729
 * @Date: 2026-07-24 21:51:58
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-07-24 21:51:58
 */
import type { WithNavigation } from '@types'
import type { WithFilterProps } from '../../../types'

export type Props = WithNavigation<
  WithFilterProps<{
    setFalse: () => void
  }>
>
