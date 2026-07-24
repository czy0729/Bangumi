/*
 * @Author: czy0729
 * @Date: 2026-07-24 23:18:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 23:19:07
 */
import type { PropsWithChildren } from 'react'
import type { Fn } from '@types'
import type { Props as ParentProps } from '../types'

export type Props = PropsWithChildren<
  Pick<ParentProps, 'visible' | 'title'> & {
    focus?: boolean
    onClose?: Fn
  }
>
