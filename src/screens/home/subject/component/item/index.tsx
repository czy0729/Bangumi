/*
 * @Author: czy0729
 * @Date: 2022-07-08 07:35:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 10:21:46
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { InView, ITEM_COMMENT_HEIGHT, ItemComment } from '@_'
import { _, rakuenStore, systemStore, useStore } from '@stores'
import { getIsBlockedUser } from '@utils'
import { COMPONENT, POPOVER_DATA } from './ds'
import { styles } from './styles'

import type { Id, UserId } from '@types'
import type { Ctx } from '../../types'
import type { Props } from './types'

function Item({
  index,
  id,
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
}: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const handleSelect = useCallback(
    (
      title: string,
      userData: {
        avatar: string
        userId: UserId
        userName: string
      },
      comment: string,
      relatedId: Id
    ) => {
      $.onTrackUsersCollection(title, userData, comment, relatedId, navigation)
    },
    [$, navigation]
  )

  if (getIsBlockedUser(rakuenStore.blockUserIds, userName, userId, `Subject|${$.subjectId}`)) {
    return null
  }

  if (!$.state.scrolled) return <View style={styles.item} />

  return (
    <InView key={id} y={InView.y(index, ITEM_COMMENT_HEIGHT, _.window.height)}>
      <ItemComment
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
        event={$.itemEvent}
        onSelect={handleSelect}
      />
    </InView>
  )
}

export default observer(Item)
