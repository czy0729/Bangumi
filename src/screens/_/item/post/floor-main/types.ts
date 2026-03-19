/*
 * @Author: czy0729
 * @Date: 2025-10-13 22:12:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:33:41
 */
import type { BlogId, Fn, Override, TopicId } from '@types'
import type { Props as ComponentProps } from '../types'

export type Props = Override<
  Pick<
    ComponentProps,
    | 'avatar'
    | 'contentStyle'
    | 'erase'
    | 'event'
    | 'extraStyle'
    | 'floor'
    | 'id'
    | 'matchLink'
    | 'replySub'
    | 'time'
    | 'userId'
    | 'userName'
    | 'userSign'
    | 'onJumpTo'
  >,
  {
    formhash: string
    isAuthor: boolean
    isFriend: boolean
    isNew: boolean
    likeType: string
    msg: string
    topicId: TopicId | BlogId
    translate: string
    url: string
    onLikesLongPress: Fn
    onShowFixedTextare: Fn
  }
>
