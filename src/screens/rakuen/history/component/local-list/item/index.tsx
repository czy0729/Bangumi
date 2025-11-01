/*
 * @Author: czy0729
 * @Date: 2019-11-28 17:16:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-01 18:20:46
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, Touchable, UserStatus } from '@components'
import { Avatar, Name } from '@_'
import { _, useStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'
import type { Props } from './types'

function Item({ topicId, avatar, userName, title, group, time = '', userId }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <Touchable
        animate
        onPress={() => {
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

          t('本地帖子.跳转', {
            to: 'Topic',
            topicId
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
                <Text size={15} bold>
                  {title === 'undefined' ? '(此帖子已删除)' : title}
                </Text>
                <Text style={_.mt.xs} type='sub' size={11} lineHeight={12}>
                  {time.split(' ')?.[1]} /{' '}
                  <Name userId={userId} type='sub' size={11} lineHeight={12} showFriend>
                    {userName}
                  </Name>{' '}
                  / {group}
                </Text>
              </Flex.Item>
              {$.isFavor(topicId) && (
                <Iconfont style={styles.favor} size={16} name='md-star' color={_.colorYellow} />
              )}
            </Flex>
          </Flex.Item>
        </Flex>
      </Touchable>
    )
  })
}

export default Item
