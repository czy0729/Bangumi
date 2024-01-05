/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:55:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-05 16:10:04
 */
import React from 'react'
import { Flex } from '@components'
import { obc } from '@utils/decorators'
import Detail from '../detail'
import Title from '../title'
import { styles } from './styles'

function Content({ groupCn, replyCount, time, title, topicId, userId, userName, isGroup }) {
  return (
    <Flex style={styles.item} align='start'>
      <Flex.Item>
        <Title topicId={topicId} title={title} replyCount={replyCount} isGroup={isGroup} />
        <Detail time={time} groupCn={groupCn} userName={userName} userId={userId} />
      </Flex.Item>
    </Flex>
  )
}

export default obc(Content)
