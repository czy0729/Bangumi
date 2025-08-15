/*
 * @Author: czy0729
 * @Date: 2024-06-07 07:19:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 16:27:03
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Flex, Text, Touchable, UserStatus } from '@components'
import { Name } from '@_'
import { _, rakuenStore, useStore } from '@stores'
import { correctAgo, HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { TopicId } from '@types'
import { Ctx } from '../../../types'
import Comment from '../comment'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Item({ title, href, replies, userName, tip = '', tipHref = '', time }) {
  const { $, navigation } = useStore<Ctx>()
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

  const avatar = $.avatar(topicId)
  const userId = tipHref.split('/user/')?.[1]

  return (
    <>
      <Flex style={styles.item} align='start'>
        {!!avatar && (
          <View style={styles.avatar}>
            <UserStatus userId={userId}>
              <Avatar navigation={navigation} src={avatar} userId={userId} />
            </UserStatus>
          </View>
        )}
        <Flex.Item>
          <Touchable
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
              <Flex style={_.mt.xs}>
                <Text type='sub' size={11} lineHeight={12}>
                  最后回复 {correctAgo(time)} /{' '}
                  <Name userId={userId} type='sub' size={11} lineHeight={12} showFriend>
                    {tip}
                  </Name>{' '}
                  / {userName}
                </Text>
              </Flex>
            </View>
          </Touchable>
        </Flex.Item>
      </Flex>

      <Comment topicId={topicId} />
    </>
  )
}

export default ob(Item, COMPONENT)
