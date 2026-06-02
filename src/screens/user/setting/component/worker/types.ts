/*
 * @Author: czy0729
 * @Date: 2026-06-02 00:20:22
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-06-02 00:20:22
 */
import type { NavigationProps } from '@types'
import type { WithFilterProps } from '../../types'

export type PingStatus = 'idle' | 'testing' | 'done' | 'fail'

export type Props = WithFilterProps<
  NavigationProps & {
    open?: boolean
  }
>
