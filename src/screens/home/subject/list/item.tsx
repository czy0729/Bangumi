/*
 * @Author: czy0729
 * @Date: 2022-07-08 07:35:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-03 16:36:42
 */
import React from 'react'
import { ItemComment } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

const POPOVER_DATA = {
  动画: ['特别关注TA的动画评论'],
  书籍: ['特别关注TA的书籍评论'],
  游戏: ['特别关注TA的游戏评论'],
  音乐: ['特别关注TA的音乐评论'],
  三次元: ['特别关注TA的三次元评论']
} as const

function Item(
  { time, avatar, userId, userName, star, comment },
  { $, navigation }: Ctx
) {
  const { rendered } = $.state
  if (!rendered) return null

  const event = {
    id: '条目.跳转',
    data: {
      from: '吐槽',
      subjectId: $.subjectId
    }
  } as const

  return (
    <ItemComment
      navigation={navigation}
      event={event}
      time={time}
      avatar={avatar}
      userId={userId}
      userName={userName}
      star={$.hideScore ? undefined : star}
      comment={comment}
      popoverData={POPOVER_DATA[$.type]}
      onSelect={$.onTrackUsersCollection}
    />
  )
}

export default obc(Item)
