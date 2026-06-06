/*
 * @Author: czy0729
 * @Date: 2026-05-15 05:31:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 05:21:56
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Avatar, Expand, Flex, Text, Touchable, UserStatus } from '@components'
import { isBlockUser } from '@_/item/post/utils'
import { _ } from '@stores'
import { open } from '@utils'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { HOST } from '@constants'
import { parseUrlHighlight } from './utils'
import { memoStyles } from './styles'

import type { TopicId } from '@types'
import type { Props } from './types'
function Item({
  navigation,
  id,
  title,
  reply_count,
  group_name,
  user_nickname,
  user_avatar,
  user_username,
  created_at,
  content,
  openWebBrowser,
  onClose
}: Props) {
  r('RecommendTopicItem')

  const handleAvatarPress = useCallback(() => {
    onClose()

    setTimeout(() => {
      navigation.push('Zone', {
        userId: user_username,
        _name: user_nickname
      })
    }, 320)
  }, [navigation, onClose, user_nickname, user_username])

  const handlePress = useCallback(() => {
    if (!openWebBrowser) onClose()

    setTimeout(() => {
      const topicId = `group/${id}` as TopicId
      if (openWebBrowser) {
        open(`${HOST}/${topicId}`)
        return
      }

      navigation.push('Topic', {
        topicId,
        _title: title,
        _replies: String(reply_count)
      })

      t('帖子.跳转', {
        to: 'Topic',
        topicId
      })
    }, 320)
  }, [id, navigation, onClose, openWebBrowser, reply_count, title])

  // 屏蔽用户
  if (isBlockUser(user_username, user_nickname, '', `TopicRecommend|${id}`)) return null

  const styles = memoStyles()

  return (
    <View style={_.container.block}>
      <Touchable animate onPress={handlePress}>
        <Flex style={styles.item} align='start'>
          <UserStatus style={styles.avatar} userId={user_username}>
            <Avatar src={user_avatar} size={34} radius={_.radiusXs} onPress={handleAvatarPress} />
          </UserStatus>
          <Flex.Item style={_.ml.sm}>
            <Text size={13} bold numberOfLines={3}>
              {title}
              {!!reply_count && (
                <Text type='main' size={10} lineHeight={13} bold>
                  {' '}
                  +{reply_count}
                </Text>
              )}
            </Text>
            <Text style={_.mt.xs} type='sub' size={11} numberOfLines={1}>
              {created_at.slice(2, 10)} / {user_nickname} / {group_name}
            </Text>
          </Flex.Item>
        </Flex>
      </Touchable>
      {!!content && (
        <Flex.Item style={styles.content}>
          <Expand ratio={0.56} linearGradientColor={_.colorBgRaw}>
            <Text size={10} numberOfLines={50}>
              {parseUrlHighlight(content.trim())}
            </Text>
          </Expand>
        </Flex.Item>
      )}
    </View>
  )
}

export default observer(Item)
