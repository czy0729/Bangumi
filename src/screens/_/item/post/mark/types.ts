/*
 * @Author: czy0729
 * @Date: 2025-10-14 02:57:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:37:31
 */
import type { Override, WithViewStyles } from '@types'
import type { Props as ComponentProps } from '../types'

export type Props = WithViewStyles<
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
