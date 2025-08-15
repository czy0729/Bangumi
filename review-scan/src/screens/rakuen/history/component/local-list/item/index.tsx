/*
 * @Author: czy0729
 * @Date: 2019-11-28 17:16:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 16:24:03
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, Touchable, UserStatus } from '@components'
import { Avatar, Name } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Item({ topicId, avatar, userName, title, group, time = '', userId }) {
  const { $, navigation } = useStore<Ctx>()
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
}

export default ob(Item, COMPONENT)
