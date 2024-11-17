/*
 * @Author: czy0729
 * @Date: 2020-07-28 11:59:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:18:44
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
  return (
    <View style={styles.container}>
      <Flex>
        <UserStatus userId={id}>
          <Avatar navigation={navigation} size={36} event={EVENT} userId={id} src={avatar} radius />
        </UserStatus>
        <Flex.Item style={_.ml.sm}>
          <Text size={12} bold>
            {name}
            <Text size={10} lineHeight={12} type='sub'>
              {'  '}
              {simpleTime(time).split(' ')[0]}
            </Text>
          </Text>
          {!!star && <Stars style={_.mt.xxs} value={star} size={11} />}
        </Flex.Item>
      </Flex>
      {!!comment && (
        <Flex style={_.mt.xs}>
          <Text style={styles.comment} size={_.web(12, _.device(13, 14))} lineHeight={15}>
            {comment}
          </Text>
        </Flex>
      )}
    </View>
  )
}

export default ob(Item, COMPONENT)
