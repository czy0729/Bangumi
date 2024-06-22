/*
 * @Author: czy0729
 * @Date: 2024-06-22 16:48:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-22 18:05:08
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { correctAgo, HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Item(
  { id, title, replies, time, content, avatar, userId, userName },
  { navigation }: Ctx
) {
  const styles = memoStyles()
  return (
    <Touchable
      style={styles.item}
      animate
      onPress={() => {
        navigation.push('Blog', {
          blogId: id
        })
      }}
    >
      <Flex style={styles.wrap} align='start'>
        <View style={_.mr.sm}>
          <Avatar navigation={navigation} userId={userId} name={userName} src={avatar} />
        </View>
        <Flex.Item>
          <Text size={15}>
            {HTMLDecode(title)}
            {replies !== '+0' && (
              <Text type='main' size={12} lineHeight={15} bold>
                {' '}
                {replies}
              </Text>
            )}
          </Text>
          <Text style={_.mt.sm} type='sub' size={12}>
            {correctAgo(time)} /{' '}
            <Text type='sub' size={12} bold>
              {userName}
            </Text>
          </Text>
          <Text style={_.mt.sm} size={13} lineHeight={15} numberOfLines={4}>
            {content}
          </Text>
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

export default obc(Item, COMPONENT)
