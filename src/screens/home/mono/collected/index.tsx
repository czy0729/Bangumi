/*
 * @Author: czy0729
 * @Date: 2023-01-10 05:37:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-10 06:08:53
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Text, UserStatus } from '@components'
import { Avatar, PreventTouchPlaceholder, SectionTitle } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { Ctx } from '../types'
import { styles } from './styles'

const EVENT = {
  id: '人物.跳转',
  data: {
    from: '谁收藏了'
  }
} as const

function Collected(props, { $, navigation }: Ctx) {
  global.rerender('Mono.Collected')

  const { collected } = $.mono
  if (!collected.length) return null

  return (
    <View style={_.mt.md}>
      <SectionTitle style={_.container.wind}>谁收藏了</SectionTitle>
      <ScrollView
        style={_.mt.md}
        contentContainerStyle={_.container.wind}
        horizontal
        {...SCROLL_VIEW_RESET_PROPS}
      >
        {collected.map(item => (
          <Flex key={item.userId} style={styles.item}>
            <UserStatus userId={item.userId}>
              <Avatar
                navigation={navigation}
                userId={item.userId}
                name={item.name}
                src={item.avatar}
                event={EVENT}
              />
            </UserStatus>
            <View style={_.ml.sm}>
              <Flex>
                <Text size={13} bold>
                  {item.name}
                </Text>
              </Flex>
              <Text style={_.mt.xs} size={10} type='sub'>
                {item.last}
              </Text>
            </View>
          </Flex>
        ))}
      </ScrollView>
      <PreventTouchPlaceholder />
    </View>
  )
}

export default obc(Collected)
