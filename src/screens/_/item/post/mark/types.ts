/*
 * @Author: czy0729
 * @Date: 2025-10-14 02:57:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-14 03:06:56
 */
import type { Override, WithViewStyles } from '@types'
import type { Props as ComponentProps } from '../types'

export type Props = WithViewStyles<
  Required<
    Override<
      Pick<
        ComponentProps,
        'id' | 'message' | 'userId' | 'userName' | 'avatar' | 'directFloor' | 'event'
      >,
      {
        url: string
      }
    >
  >
>
