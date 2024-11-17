/*
 * @Author: czy0729
 * @Date: 2024-11-03 04:51:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:20:04
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Flex, Highlight, Text, UserStatus } from '@components'
import { Name } from '@_'
import { _, useStore } from '@stores'
import { correctAgo } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

const EVENT = {
  id: '词云.跳转'
} as const

function Comments() {
  const { $, navigation } = useStore<Ctx>()
  const { title } = $.state
  return (
    <View style={styles.container}>
      {$.selectedComment.map(item => {
        const { userId, userName, time, action } = item
        return (
          <Flex key={item.id} style={_.mb.md} align='start'>
            <UserStatus userId={userId}>
              <Avatar
                navigation={navigation}
                userId={userId}
                name={userName}
                src={item.avatar}
                size={32}
                event={EVENT}
              />
            </UserStatus>
            <Flex.Item style={_.ml.sm}>
              <Name
                size={14}
                bold
                userId={userId}
                showFriend
                right={
                  <Text type='sub' size={11} lineHeight={14}>
                    {'  '}
                    {action ? `${action} · ` : ''}
                    {String(time).includes('ago') ? correctAgo(time) : time}
                  </Text>
                }
              >
                {userName}
              </Name>
              <Highlight style={_.mt.xs} size={13} lineHeight={16} value={title} selectable>
                {item.comment}
              </Highlight>
            </Flex.Item>
          </Flex>
        )
      })}
    </View>
  )
}

export default ob(Comments)
