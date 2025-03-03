/*
 * @Author: czy0729
 * @Date: 2020-07-28 11:59:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-03 18:21:56
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, UserStatus } from '@components'
import { Avatar, Stars } from '@_'
import { _ } from '@stores'
import { simpleTime } from '@utils'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'

function Item({ id, avatar, name, time, star, comment }) {
  const navigation = useNavigation()
  const styles = memoStyles()
  const recent = simpleTime(time).split(' ')?.[0] || ''
  return (
    <View style={styles.container}>
      <Flex>
        <UserStatus userId={id}>
          <Avatar navigation={navigation} size={36} event={EVENT} userId={id} src={avatar} radius />
        </UserStatus>
        <Flex.Item style={_.ml.sm}>
          <Text size={12} bold numberOfLines={1}>
            {name}
          </Text>
          <View style={_.mt.xs}>
            {star ? (
              <Stars value={star} size={10} extraText={` · ${recent}`} />
            ) : (
              <Text size={10} lineHeight={12} type='sub' bold>
                {recent}
              </Text>
            )}
          </View>
        </Flex.Item>
      </Flex>
      {!!comment && (
        <Flex style={_.mt.xs}>
          <Text style={styles.comment} size={_.web(12, 13)} lineHeight={15}>
            {comment}
          </Text>
        </Flex>
      )}
    </View>
  )
}

export default ob(Item, COMPONENT)
