/*
 * @Author: czy0729
 * @Date: 2024-10-10 12:41:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-11 08:17:43
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Flex, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Filter from '../filter'
import { COMPONENT } from './ds'
import { styles } from './styles'

function User(_props, { $, navigation }: Ctx) {
  const { userId, userName } = $.users
  if (!userId) return null

  return (
    <Flex style={styles.user}>
      <Flex.Item>
        <Flex>
          <Avatar
            navigation={navigation}
            userId={userId}
            name={userName}
            src={$.users.avatar}
            size={48}
            radius={0}
            placeholder={false}
          />
          <View style={_.ml.sm}>
            <Text bold shadow>
              {userName}
            </Text>
            <Text style={_.mt.xs} type='sub' size={11} bold shadow>
              @{userId}
            </Text>
          </View>
        </Flex>
      </Flex.Item>
      <Filter />
    </Flex>
  )
}

export default obc(User, COMPONENT)
