/*
 * @Author: czy0729
 * @Date: 2022-07-08 07:35:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 17:52:56
 */
import React from 'react'
import { InView, ItemComment } from '@_'
import { _, rakuenStore } from '@stores'
import { getIsBlockUser } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

const POPOVER_DATA = {
  动画: ['复制评论', '特别关注TA的动画评论', '屏蔽用户'],
  书籍: ['复制评论', '特别关注TA的书籍评论', '屏蔽用户'],
  游戏: ['复制评论', '特别关注TA的游戏评论', '屏蔽用户'],
  音乐: ['复制评论', '特别关注TA的音乐评论', '屏蔽用户'],
  三次元: ['复制评论', '特别关注TA的三次元评论', '屏蔽用户']
} as const

const ITEM_HEIGHT = 100

function Item(
  { index, time, avatar, userId, userName, star, comment },
  { $, navigation }: Ctx
) {
  if (!$.rendered) return null

  const { blockUserIds } = rakuenStore.setting
  if (getIsBlockUser(blockUserIds, userName, userId, `Subject|${$.subjectId}`)) {
    return null
  }

  const event = {
    id: '条目.跳转',
    data: {
      from: '吐槽',
      subjectId: $.subjectId
    }
  } as const

  return (
    <InView key={userId} y={_.window.height + index * ITEM_HEIGHT}>
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
    </InView>
  )
}

export default obc(Item)
