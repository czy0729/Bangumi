/*
 * @Author: czy0729
 * @Date: 2024-03-05 04:22:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 18:42:32
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Flex, UserStatus } from '@components'
import { _ } from '@stores'
import { getTimestamp } from '@utils'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function User({ navigation, userId, avatar, nickname, lastActive, event }) {
  const styles = memoStyles()
  return (
    <View style={_.mt.sm}>
      {!!avatar && (
        <Flex style={styles.fixed} justify='center'>
          <UserStatus
            style={styles.userStatus}
            last={getTimestamp((lastActive || '').replace('T', ' '))}
            mini
          >
            <Avatar
              navigation={navigation}
              size={30}
              src={avatar}
              userId={userId}
              name={nickname}
              skeletonType='tinygrail'
              event={event}
            />
          </UserStatus>
        </Flex>
      )}
    </View>
  )
}

export default ob(User)
