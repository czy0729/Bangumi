/*
 * @Author: czy0729
 * @Date: 2022-07-08 07:35:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-03 16:40:27
 */
import React from 'react'
import { InView, ItemComment } from '@_'
import { _, rakuenStore } from '@stores'
import { getIsBlockUser } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { ITEM_HEIGHT, POPOVER_DATA } from './ds'

function Item(
  { index, time, avatar, userId, userName, star, comment, relatedId },
  { $, navigation }: Ctx
) {
  const { rendered } = $.state
  if (!rendered) return null

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
        subjectId={$.subjectId}
        relatedId={relatedId}
        popoverData={POPOVER_DATA[$.type]}
        onSelect={$.onTrackUsersCollection}
      />
    </InView>
  )
}

export default obc(Item)
