/*
 * @Author: czy0729
 * @Date: 2025-10-13 22:35:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-14 03:20:48
 */
import { Fn, Override, RakuenNewFloorStyleCn } from '@types'
import { Props as ComponentProps } from '../types'

export type Props = Required<
  Override<
    Pick<
      ComponentProps,
      | 'authorId'
      | 'event'
      | 'expandNums'
      | 'extraStyle'
      | 'id'
      | 'matchLink'
      | 'postId'
      | 'sub'
      | 'userId'
      | 'onJumpTo'
    >,
    {
      isExpand: boolean
      newFloorStyle: RakuenNewFloorStyleCn
      readedTime: string
      url: string
      onShowFixedTextare: Fn
      onToggleExpand: Fn
    }
  >
>
