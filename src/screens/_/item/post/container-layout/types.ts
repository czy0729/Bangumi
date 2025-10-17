/*
 * @Author: czy0729
 * @Date: 2025-10-13 20:40:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-13 20:43:30
 */
import type { PropsWithChildren } from 'react'
import type { Override } from '@types'
import type { Props as ComponentProps } from '../types'

export type Props = Required<
  PropsWithChildren<
    Override<
      Pick<ComponentProps, 'id'>,
      {
        subLength: number
        isJump: boolean
      }
    >
  >
>
