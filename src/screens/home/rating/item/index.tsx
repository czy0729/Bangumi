/*
 * @Author: czy0729
 * @Date: 2020-07-28 11:59:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 10:44:16
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { Avatar, Stars } from '@_'
import { _ } from '@stores'
import { simpleTime } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const EVENT = {
  id: '用户评分.跳转'
} as const

function Item({ id, avatar, name, time, star, comment }, { navigation }: Ctx) {
  const styles = memoStyles()
  return (
    <View style={styles.container}>
      <Flex>
        <Avatar navigation={navigation} event={EVENT} userId={id} src={avatar} radius />
        <Flex.Item style={_.ml.sm}>
          <Text size={12} bold>
            {name}
            <Text size={10} lineHeight={12} type='sub'>
              {' '}
              {simpleTime(time).split(' ')[0]}
            </Text>
          </Text>
          {!!star && <Stars style={_.mt.xxs} value={star} size={11} />}
        </Flex.Item>
      </Flex>
      {!!comment && (
        <Flex style={_.mt.xs}>
          <Text style={styles.comment} size={_.device(12, 14)} lineHeight={15}>
            {comment}
          </Text>
        </Flex>
      )}
    </View>
  )
}

export default obc(Item)
