/*
 * @Author: czy0729
 * @Date: 2024-08-21 18:41:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:07:48
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Avatar, Flex, Text, UserStatus } from '@components'
import { _ } from '@stores'
import { useNavigation } from '@utils/hooks'
import { AVATAR_WIDTH } from '../ds'

function Desc({ userId, avatar, name, date, event }) {
  const navigation = useNavigation()

  return (
    <Flex style={_.mt.md}>
      <View style={_.mr.sm}>
        <UserStatus userId={userId} mini>
          <Avatar
            key={avatar}
            navigation={navigation}
            size={AVATAR_WIDTH}
            userId={userId}
            name={name}
            src={avatar}
            event={event}
          />
        </UserStatus>
      </View>
      <Flex.Item>
        {!!name && (
          <Text size={12} bold numberOfLines={1}>
            {name}
          </Text>
        )}
        {!!date && (
          <Text size={10} lineHeight={11} type='sub'>
            {date}
          </Text>
        )}
      </Flex.Item>
    </Flex>
  )
}

export default observer(Desc)
