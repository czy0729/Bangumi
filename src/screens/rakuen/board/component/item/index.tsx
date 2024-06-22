/*
 * @Author: czy0729
 * @Date: 2024-06-23 05:22:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-23 05:24:10
 */

import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { Avatar, Name } from '@_'
import { _, rakuenStore } from '@stores'
import { appNavigate, correctAgo, getIsBlockUser, HTMLDecode, info, open, stl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { API_AVATAR, HOST, LIMIT_TOPIC_PUSH } from '@constants'
import { TopicId } from '@types'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Item({ title, href, replies, time, userId, userName }, { $, navigation }: Ctx) {
  if (getIsBlockUser(rakuenStore.blockUserIds, userName, userId, `Board|${href}`)) return null

  const styles = memoStyles()
  const topicId = href.replace('/subject/topic/', 'subject/') as TopicId
  const readed = $.readed(topicId)
  const isReaded = !!readed.time
  const replyText = `+${replies.replace(' replies', '')}`
  return (
    <Touchable
      key={href}
      style={stl(styles.item, isReaded && styles.readed)}
      animate
      onPress={() => {
        if (Number(replies) > LIMIT_TOPIC_PUSH) {
          const url = `${HOST}${href}`
          t('讨论版.跳转', {
            to: 'WebBrowser',
            url
          })

          info('该帖评论多, 自动使用浏览器打开')
          setTimeout(() => {
            open(url)
          }, 1600)
        } else {
          // 记录帖子查看历史详情
          $.onItemPress(topicId, replies)
          appNavigate(
            href,
            navigation,
            {
              _title: title,
              _replies: replyText,
              _time: time
            },
            {
              id: '讨论版.跳转'
            }
          )
        }
      }}
    >
      <Flex style={styles.wrap} align='start'>
        <View style={_.mr.sm}>
          <Avatar
            navigation={navigation}
            userId={userId}
            name={userName}
            src={API_AVATAR(userId)}
          />
        </View>
        <Flex.Item>
          <Text size={15}>
            {HTMLDecode(title)}
            {replyText !== '+0' && (
              <Text type={isReaded ? 'sub' : 'main'} size={12} lineHeight={15} bold>
                {' '}
                {replyText}
              </Text>
            )}
          </Text>
          <Text style={_.mt.xs} type='sub' size={12}>
            {correctAgo(time)} /{' '}
            <Name userId={userId} showFriend size={12} bold>
              {userName}
            </Name>
          </Text>
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

export default obc(Item, COMPONENT)
