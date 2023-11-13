/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:55:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 17:02:18
 */
import React from 'react'
import { Flex } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Title from './title'
import Detail from './detail'

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

const styles = _.create({
  item: {
    paddingVertical: _.md - 4,
    paddingLeft: _.sm,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
})
