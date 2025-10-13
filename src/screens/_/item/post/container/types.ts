/*
 * @Author: czy0729
 * @Date: 2025-10-13 20:13:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-13 20:15:01
 */
import { PropsWithChildren } from 'react'
import { Override } from '@types'
import { Props as ComponentProps } from '../types'

export type Props = Required<
  PropsWithChildren<
    Override<
      Pick<ComponentProps, 'id'>,
      {
        subLength: number
        isNew: boolean
      }
    >
  >
>
