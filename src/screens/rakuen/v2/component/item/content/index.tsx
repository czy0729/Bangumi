/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:55:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 02:58:28
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import Detail from '../detail'
import Title from '../title'
import { styles } from './styles'

import type { Props } from './types'

function Content({
  groupCn,
  replyCount,
  time,
  title,
  topicId,
  userId,
  userName,
  avatar,
  isGroup
}: Props) {
  const isMono = topicId.startsWith('crt/') || topicId.startsWith('prsn/')
  const isEp = topicId.startsWith('ep/')

  return (
    <View style={styles.item}>
      <Title topicId={topicId} title={title} replyCount={replyCount} isGroup={isGroup} />
      <Detail
        time={time}
        groupCn={isMono ? '' : groupCn}
        userName={isMono || isEp ? '' : userName}
        userId={isMono || isEp ? '' : userId}
        avatar={isMono || isEp ? '' : avatar}
      />
    </View>
  )
}

export default observer(Content)
