/*
 * @Author: czy0729
 * @Date: 2022-07-08 07:35:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-03 16:03:43
 */
import React from 'react'
import { InView, ItemComment } from '@_'
import { _, rakuenStore } from '@stores'
import { getIsBlockedUser } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, ITEM_HEIGHT, POPOVER_DATA } from './ds'

function Item(
  { index, time, avatar, userId, userName, star, comment, relatedId, action, mainId, mainName },
  { $, navigation }: Ctx
) {
  if (
    !$.state.rendered ||
    getIsBlockedUser(rakuenStore.blockUserIds, userName, userId, `Subject|${$.subjectId}`)
  ) {
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
        action={action}
        mainId={mainId}
        mainName={mainName}
        popoverData={POPOVER_DATA[$.type]}
        onSelect={$.onTrackUsersCollection}
      />
    </InView>
  )
}

export default obc(Item, COMPONENT)
