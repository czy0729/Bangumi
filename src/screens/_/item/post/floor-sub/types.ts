/*
 * @Author: czy0729
 * @Date: 2025-10-13 22:35:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:35:25
 */
import type { Fn, Override, RakuenNewFloorStyleCn } from '@types'
import type { Props as ComponentProps } from '../types'

export type Props = Override<
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
