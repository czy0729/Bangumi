/*
 * @Author: czy0729
 * @Date: 2024-11-16 09:18:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:21:13
 */
import { AnyObject, DeepPartial, Fn, TopicId, UserId } from '@types'

export type Ctx = DeepPartial<{
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
}>
