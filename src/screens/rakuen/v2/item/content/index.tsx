/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:55:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-11 20:27:05
 */
import React from 'react'
import { Flex } from '@components'
import { obc } from '@utils/decorators'
import Title from '../title'
import Detail from '../detail'
import { styles } from './styles'

function Content({
  groupCn,
  replyCount,
  time,
  title,
  topicId,
  userId,
  userName,
  isReaded,
  isGroup
}) {
  return (
    <Flex style={styles.item} align='start'>
      <Flex.Item>
        <Title
          topicId={topicId}
          title={title}
          replyCount={replyCount}
          isReaded={isReaded}
          isGroup={isGroup}
        />
        <Detail time={time} groupCn={groupCn} userName={userName} userId={userId} />
      </Flex.Item>
    </Flex>
  )
}

export default obc(Content)
