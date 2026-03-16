/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:40:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 01:57:34
 */
import React from 'react'
import { Text } from '@components'
import { useStore } from '@stores'
import { getVisualLength } from '@utils'
import { useObserver } from '@utils/hooks'
import { BASE_TEXT_PROPS, OLD_GROUP_ID } from './ds'

import type { Ctx } from '../../../types'
import type { Props } from './types'
function Title({ topicId, title, replyCount, isGroup }: Props) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
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

    const visualLength = getVisualLength(title)

    return (
      <Text {...BASE_TEXT_PROPS} size={visualLength >= 48 ? 12 : visualLength >= 36 ? 13 : 14} bold>
        {title}
        {!!replyCount && (
          <Text type={isReaded ? 'sub' : 'main'} {...BASE_TEXT_PROPS} bold>
            {' '}
            {replyText}
          </Text>
        )}
        {!!replyAdd && (
          <Text type='main' {...BASE_TEXT_PROPS} bold>
            {' '}
            {replyAdd}
          </Text>
        )}
        {isOldTopic && (
          <Text {...BASE_TEXT_PROPS} type='sub'>
            {' '}
            旧帖
          </Text>
        )}
      </Text>
    )
  })
}

export default Title
