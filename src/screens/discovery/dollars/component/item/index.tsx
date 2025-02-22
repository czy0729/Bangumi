/*
 * @Author: czy0729
 * @Date: 2023-04-26 17:17:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-03 00:48:23
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, UserStatus } from '@components'
import { Avatar, InView } from '@_'
import { _, useStore } from '@stores'
import { HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT, ITEM_HEIGHT } from './ds'
import { memoStyles } from './styles'

function Item({ index, avatar, nickname, msg, color }) {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const userId = String(avatar).match(/\/(\d+)\.jpg/)?.[1]
  return (
    <Flex style={styles.item} align='start'>
      <Flex style={styles.avatar} direction='column'>
        <UserStatus userId={userId}>
          <InView style={styles.inView} y={ITEM_HEIGHT * (index + 1)}>
            <Avatar
              src={`${HOST}/pic/user/l/${avatar}`}
              size={52}
              borderWidth={2}
              borderColor={_.select(_.colorBorder, 'rgba(255, 255, 255, 0.88)')}
              radius={_.radiusSm}
              onPress={() => $.onToggleShow(nickname)}
              onLongPress={() => {
                if (!userId) return

                navigation.push('Zone', {
                  userId
                })

                t('Dollars.跳转', {
                  to: 'Zone',
                  userId
                })
              }}
            />
          </InView>
        </UserStatus>
        <Text style={_.mt.sm} size={12} bold align='center'>
          {nickname}
        </Text>
      </Flex>
      <Flex.Item>
        <View
          style={[
            styles.content,
            {
              backgroundColor: color || 'transparent'
            }
          ]}
        >
          <Text type='__plain__' lineHeight={17} bold shadow selectable>
            {HTMLDecode(msg).replace(/<br \/>/g, '')}
          </Text>
        </View>
      </Flex.Item>
    </Flex>
  )
}

export default ob(Item, COMPONENT)
