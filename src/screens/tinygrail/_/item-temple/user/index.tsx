/*
 * @Author: czy0729
 * @Date: 2024-03-05 04:22:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 04:42:25
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Flex } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { styles } from './styles'

function User({ navigation, userId, avatar, nickname, event }) {
  return (
    <View style={_.mt.sm}>
      {!!avatar && (
        <Flex style={styles.fixed} justify='center'>
          <Avatar
            navigation={navigation}
            size={31}
            src={avatar}
            userId={userId}
            name={nickname}
            borderColor='transparent'
            event={event}
          />
        </Flex>
      )}
    </View>
  )
}

export default ob(User)
