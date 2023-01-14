/*
 * @Author: czy0729
 * @Date: 2023-01-10 05:37:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-14 20:11:41
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Iconfont, Text, Touchable, UserStatus } from '@components'
import { Avatar, PreventTouchPlaceholder, SectionTitle } from '@_'
import { _ } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { HOST, SCROLL_VIEW_RESET_PROPS } from '@constants'
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
  if (!collected?.length) return null

  return (
    <View style={_.mt.md}>
      <SectionTitle
        style={_.container.wind}
        right={
          <Flex>
            <Touchable
              style={styles.touch}
              onPress={() => {
                open(`${HOST}/${$.monoId}/collections`)
              }}
            >
              <Flex>
                <Text style={_.ml.sm} type='sub'>
                  全部
                </Text>
                <Iconfont
                  style={_.ml.xs}
                  name='md-open-in-new'
                  color={_.colorSub}
                  size={16}
                />
              </Flex>
            </Touchable>
          </Flex>
        }
      >
        谁收藏了
      </SectionTitle>
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
