/*
 * @Author: czy0729
 * @Date: 2024-06-07 07:19:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-09 17:17:25
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _, rakuenStore } from '@stores'
import { correctAgo, HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { TopicId } from '@types'
import { Ctx } from '../../../types'
import Comment from '../comment'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Item({ title, href, replies, userName, tip = '', time }, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const topicId = href.replace('/group/topic/', 'group/') as TopicId
  const readed = $.readed(topicId)
  const isReaded = !!readed.time

  // 处理 (+30) +10 样式
  const replyText = `+${replies}`
  let replyAdd: string
  if (isReaded) {
    if (Number(replies) > readed.replies) {
      replyAdd = `+${Number(replies) - readed.replies}`
    }
  }

  return (
    <>
      <Touchable
        style={styles.item}
        animate
        onPress={() => {
          // 记录帖子查看历史详情
          rakuenStore.updateTopicReaded(topicId, Number(replies))

          navigation.push('Topic', {
            topicId,
            _title: title,
            _replies: `+${replies}`,
            _time: time
          })
        }}
      >
        <View style={styles.wrap}>
          <Text size={15} bold>
            {HTMLDecode(title)}
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
          </Text>
          <Flex style={_.mt.sm}>
            <Text type='sub' size={11}>
              最后回复 {correctAgo(time)} / {tip} / {userName}
            </Text>
          </Flex>
        </View>
      </Touchable>
      <Comment topicId={topicId} />
    </>
  )
}

export default obc(Item, COMPONENT)
