/*
 * @Author: czy0729
 * @Date: 2025-10-13 20:13:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:30:26
 */
import type { PropsWithChildren } from 'react'
import type { Override } from '@types'
import type { Props as ComponentProps } from '../types'

export type Props = PropsWithChildren<
  Override<
    Pick<ComponentProps, 'id'>,
    {
      subLength: number
      isNew: boolean
    }
  >
>
