/*
 * @Author: czy0729
 * @Date: 2024-11-16 09:18:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 04:09:50
 */
import type { Override, RakuenNewFloorStyleCn, TopicId, UserId } from '@types'
import type { Props as ComponentProps } from '../types'

export type Props = Override<
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
    onShowFixedTextare: () => void
  }
>

export type Ctx = {
  $: {
    state: {
      directFloor: string
      translateResultFloor: Record<string, string>
    }
    topicId: TopicId
    blogId: TopicId
    topic: {
      formhash: string
      likeType: string
    }
    myFriendsMap: Record<UserId, true>
    postUsersMap: Record<string, any>
    isBlockUser: (userId: UserId, userName: string, replySub?: string) => boolean
    showLikesUsers: (list: any[], emoji: number) => void
  }
}
