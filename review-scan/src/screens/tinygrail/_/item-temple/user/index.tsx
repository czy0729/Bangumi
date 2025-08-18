/*
 * @Author: czy0729
 * @Date: 2024-03-05 04:22:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 18:42:32
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import TinygrailAvatar from '@tinygrail/_/avatar'
import { styles } from './styles'

function User({ navigation, userId, avatar, nickname, lastActive, event }) {
  return (
    <View style={_.mt.sm}>
      {!!avatar && (
        <Flex style={styles.fixed} justify='center'>
          <TinygrailAvatar
            navigation={navigation}
            src={avatar}
            size={30}
            userId={userId}
            name={nickname}
            last={lastActive}
            shadow
            event={event}
          />
        </Flex>
      )}
    </View>
  )
}

export default ob(User)
