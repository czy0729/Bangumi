/*
 * @Author: czy0729
 * @Date: 2022-10-13 05:13:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:38:28
 */
import type { Override } from '@types'
import type { Props as ComponentProps } from '../types'

export type Props = Override<
  Pick<
    ComponentProps,
    'id' | 'message' | 'userId' | 'userName' | 'avatar' | 'directFloor' | 'event'
  >,
  {
    url: string
    isAuthor: boolean
    isFriend: boolean
    isLayer?: boolean
  }
>
