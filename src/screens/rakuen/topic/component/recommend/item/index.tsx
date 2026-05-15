/*
 * @Author: czy0729
 * @Date: 2026-05-15 05:31:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-15 22:59:18
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Avatar, Flex, Text, Touchable, UserStatus } from '@components'
import { isBlockUser } from '@_/item/post/utils'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { memoStyles } from './styles'

import type { TopicId } from '@types'
import type { Props } from './types'
function RecommendItem({
  navigation,
  id,
  title,
  reply_count,
  group_name,
  user_nickname,
  user_avatar,
  user_username,
  created_at,
  onClose
}: Props) {
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
    onClose()

    setTimeout(() => {
      const topicId = `group/${id}` as TopicId
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
  }, [id, navigation, onClose, reply_count, title])

  // 屏蔽用户
  if (isBlockUser(user_username, user_nickname, '', `TopicRecommend|${id}`)) return null

  const styles = memoStyles()

  return (
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
  )
}

export default observer(RecommendItem)
