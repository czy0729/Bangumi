/*
 * @Author: czy0729
 * @Date: 2022-07-08 07:35:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 04:42:27
 */
import React from 'react'
import { View } from 'react-native'
import { InView, ItemComment } from '@_'
import { _, rakuenStore, systemStore, useStore } from '@stores'
import { getIsBlockedUser } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, ITEM_HEIGHT, POPOVER_DATA } from './ds'
import { styles } from './styles'

function Item({
  index,
  time,
  avatar,
  userId,
  userName,
  star,
  comment,
  relatedId,
  action,
  mainId,
  mainName
}) {
  const { $, navigation } = useStore<Ctx>()
  if (getIsBlockedUser(rakuenStore.blockUserIds, userName, userId, `Subject|${$.subjectId}`)) {
    return null
  }

  if (!$.state.scrolled) return <View style={styles.item} />

  const event = {
    id: '条目.跳转',
    data: {
      from: '吐槽',
      subjectId: $.subjectId
    }
  } as const

  return (
    <InView key={userId} y={_.window.height + (index + 1) * ITEM_HEIGHT}>
      <ItemComment
        navigation={navigation}
        event={event}
        time={time}
        avatar={avatar}
        userId={userId}
        userName={userName}
        star={systemStore.setting.hideScore ? undefined : star}
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

export default ob(Item, COMPONENT)
