/*
 * @Author: czy0729
 * @Date: 2022-07-08 07:35:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:32:04
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { InView, ItemComment } from '@_'
import { _, rakuenStore, systemStore, useStore } from '@stores'
import { getIsBlockedUser } from '@utils'
import { COMPONENT, ITEM_HEIGHT, POPOVER_DATA } from './ds'
import { styles } from './styles'

import type { SubjectCommentsItem } from '@stores/subject/types'
import type { WithIndex } from '@types'
import type { Ctx } from '../../types'

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
}: WithIndex<SubjectCommentsItem>) {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (getIsBlockedUser(rakuenStore.blockUserIds, userName, userId, `Subject|${$.subjectId}`)) {
    return null
  }

  if (!$.state.scrolled) return <View style={styles.item} />

  return (
    <InView key={userId} y={_.window.height + (index + 1) * ITEM_HEIGHT}>
      <ItemComment
        event={$.itemEvent}
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

export default observer(Item)
