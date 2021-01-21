/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:40:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 17:47:23
 */
import React from 'react'
import { Text } from '@components'
import { obc } from '@utils/decorators'

const oldGroupId = 354697 // 少于这个数字的, 为坟贴

function Title({ topicId, title, replyCount, isReaded, isGroup }, { $ }) {
  // 处理 (+30) +10 样式
  const replyText = `+${replyCount}`
  let replyAdd
  if (isReaded) {
    const readed = $.readed(topicId)
    if (replyCount > readed.replies) {
      replyAdd = `+${replyCount - readed.replies}`
    }
  }

  // 标记坟贴
  let isOldTopic = false
  if (isGroup) {
    const id = parseInt(topicId.substring(6))
    if (id < oldGroupId) {
      isOldTopic = true
    }
  }

  return (
    <Text size={15} bold>
      {title}
      <Text type={isReaded ? 'sub' : 'main'} size={11} lineHeight={15}>
        {' '}
        {replyText}
      </Text>
      {!!replyAdd && (
        <Text type='main' size={11} lineHeight={15}>
          {' '}
          {replyAdd}
        </Text>
      )}
      {isOldTopic && (
        <Text size={11} lineHeight={15} type='warning'>
          {' '}
          旧帖
        </Text>
      )}
    </Text>
  )
}

export default obc(Title)
