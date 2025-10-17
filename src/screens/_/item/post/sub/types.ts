/*
 * @Author: czy0729
 * @Date: 2024-11-16 09:18:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-14 03:17:42
 */
import type { AnyObject, Fn, Override, RakuenNewFloorStyleCn, TopicId, UserId } from '@types'
import type { Props as ComponentProps } from '../types'

export type Props = Required<
  Override<
    Pick<
      ComponentProps,
      | 'authorId'
      | 'avatar'
      | 'erase'
      | 'event'
      | 'extraStyle'
      | 'floor'
      | 'id'
      | 'matchLink'
      | 'message'
      | 'postId'
      | 'replySub'
      | 'time'
      | 'userId'
      | 'userName'
      | 'onJumpTo'
    >,
    {
      readedTime: string
      uid: UserId
      url: string
      newFloorStyle: RakuenNewFloorStyleCn
      onShowFixedTextare: Fn
    }
  >
>

export type Ctx = {
  $: {
    state: {
      directFloor: string
      translateResultFloor: AnyObject
    }
    topicId: TopicId
    blogId: TopicId
    topic: {
      formhash: string
      likeType: string
    }
    myFriendsMap: Record<UserId, true>
    postUsersMap: AnyObject
    isBlockUser: Fn
    showLikesUsers: Fn
  }
}
