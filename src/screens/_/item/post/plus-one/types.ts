/*
 * @Author: czy0729
 * @Date: 2022-10-13 05:13:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-14 03:16:39
 */
import type { Override } from '@types'
import type { Props as ComponentProps } from '../types'

export type Props = Override<
  Required<
    Pick<
      ComponentProps,
      'id' | 'message' | 'userId' | 'userName' | 'avatar' | 'directFloor' | 'event'
    >
  >,
  {
    url: string
    isAuthor: boolean
    isFriend: boolean
    isLayer?: boolean
  }
>
