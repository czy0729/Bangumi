/*
 * @Author: czy0729
 * @Date: 2024-11-01 10:21:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 16:23:33
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, Touchable, UserStatus } from '@components'
import { Avatar, Name, Rate } from '@_'
import { _, useStore } from '@stores'
import { simpleTime } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { CollectRankItem, Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Item({ item }: { item: CollectRankItem }) {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const { topic_id: topicId } = item
  const topic = $.topic(topicId)
  if (!topic) {
    return (
      <Flex style={styles.loading} justify='center'>
        <Text type='sub'>{topicId}</Text>
      </Flex>
    )
  }

  const { type } = $.state
  const { userId, avatar, userName, title, group, time } = topic
  return (
    <Touchable
      animate
      onPress={() => {
        t('本地帖子.跳转', {
          to: 'Topic',
          topicId
        })

        navigation.push('Topic', {
          topicId,
          _noFetch: true,
          _title: title,
          _group: group,
          _time: time,
          _avatar: avatar,
          _userName: userName,
          _userId: userId
        })
      }}
    >
      <Flex style={styles.container} align='start'>
        <View style={styles.image}>
          <UserStatus userId={userId}>
            <Avatar navigation={navigation} src={avatar} userId={userId} name={userName} />
          </UserStatus>
        </View>
        <Flex.Item>
          <Flex style={styles.item} align='start'>
            <Flex.Item>
              <Text style={styles.title} bold>
                {title === 'undefined' ? '(此帖子已删除)' : title}
              </Text>
              {type === '小组' ? (
                <Text style={_.mt.xs} type='sub' size={11} lineHeight={12}>
                  {time.includes('首播') ? time : simpleTime(time)} /{' '}
                  <Name userId={userId} type='sub' size={11} lineHeight={12} showFriend>
                    {userName}
                  </Name>{' '}
                  / {group}
                </Text>
              ) : (
                <Text style={_.mt.xs} type='sub' size={11} lineHeight={12}>
                  {[time.includes('首播') ? time : simpleTime(time), userName, group]
                    .filter(item => !!item)
                    .join(' / ')}
                </Text>
              )}
            </Flex.Item>
            {$.isFavor(topicId) && (
              <Iconfont style={styles.favor} size={16} name='md-star' color={_.colorYellow} />
            )}
          </Flex>
        </Flex.Item>
        <Rate style={styles.rec} value={item.collect_count} />
      </Flex>
    </Touchable>
  )
}

export default ob(Item, COMPONENT)
