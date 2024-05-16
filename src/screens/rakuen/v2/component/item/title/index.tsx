/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:40:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 17:33:43
 */
import React from 'react'
import { Text } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { OLD_GROUP_ID } from './ds'

function Title({ topicId, title, replyCount, isGroup }, { $ }: Ctx) {
  const isReaded = $.readed(topicId).time

  // 处理 (+30) +10 样式
  const replyText = `+${replyCount}`
  let replyAdd: string
  if (isReaded) {
    const readed = $.readed(topicId)
    if (replyCount > readed.replies) replyAdd = `+${replyCount - readed.replies}`
  }

  // 标记坟贴
  let isOldTopic = false
  if (isGroup) {
    const id = parseInt(topicId.substring(6))
    if (id < OLD_GROUP_ID) isOldTopic = true
  }

  return (
    <Text lineHeight={14} bold>
      {title}
      {!!replyCount && (
        <Text type={isReaded ? 'sub' : 'main'} size={11} lineHeight={14} bold>
          {' '}
          {replyText}
        </Text>
      )}
      {!!replyAdd && (
        <Text type='main' size={11} lineHeight={14} bold>
          {' '}
          {replyAdd}
        </Text>
      )}
      {isOldTopic && (
        <Text size={11} lineHeight={14} type='sub'>
          {' '}
          旧帖
        </Text>
      )}
    </Text>
  )
}

export default obc(Title)
