/*
 * @Author: czy0729
 * @Date: 2024-11-03 04:51:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-01 19:06:58
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Flex, Highlight, Text, UserStatus } from '@components'
import { InView, Name } from '@_'
import { _, useStore } from '@stores'
import { correctAgo } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { AVATAR_WIDTH, EVENT, ITEM_WIDTH } from './ds'
import { styles } from './styles'

function Comments() {
  const { $, navigation } = useStore<Ctx>()
  const { title } = $.state
  return (
    <View style={styles.container}>
      {$.selectedComment.map((item, index) => {
        const { userId, userName, time, action } = item
        return (
          <Flex key={item.id} style={_.mb.md} align='start'>
            <InView
              style={{
                width: AVATAR_WIDTH
              }}
              y={ITEM_WIDTH * (index + 1)}
            >
              <UserStatus userId={userId}>
                <Avatar
                  navigation={navigation}
                  userId={userId}
                  name={userName}
                  src={item.avatar}
                  size={AVATAR_WIDTH}
                  event={EVENT}
                />
              </UserStatus>
            </InView>
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
