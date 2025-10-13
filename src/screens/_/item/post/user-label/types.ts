/*
 * @Author: czy0729
 * @Date: 2025-10-14 03:07:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-14 03:16:59
 */
import { Override } from '@types'
import { Props as ComponentProps } from '../types'

export type Props = Override<
  Pick<ComponentProps, 'userSign'>,
  {
    isAuthor: boolean
    isFriend: boolean
    isLayer?: boolean
    lineHeight?: number
  }
>
