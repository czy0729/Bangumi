/*
 * @Author: czy0729
 * @Date: 2026-07-24 05:40:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 05:40:00
 */
import type { WithNavigation } from '@types'
import type { WithFilterProps } from '../../../types'

export type Props = WithFilterProps<
  WithNavigation<{
    setFalse: () => void
  }>
>
