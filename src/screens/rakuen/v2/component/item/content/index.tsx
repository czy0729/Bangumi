/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:55:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-17 11:49:44
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from '@utils/hooks'
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
  return useObserver(() => (
    <View style={styles.item}>
      <Title topicId={topicId} title={title} replyCount={replyCount} isGroup={isGroup} />
      <Detail time={time} groupCn={groupCn} userName={userName} userId={userId} avatar={avatar} />
    </View>
  ))
}

export default Content
