/*
 * @Author: czy0729
 * @Date: 2023-04-26 17:17:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-27 17:33:18
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, UserStatus, Text } from '@components'
import { InView, Avatar } from '@_'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { HOST } from '@constants'
import { Ctx } from '../types'
import { memoStyles } from './styles'

const ITEM_HEIGHT = 64

function Item({ index, avatar, nickname, msg, color }, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const userId = String(avatar).match(/\/(\d+)\.jpg/)?.[1]
  return (
    <Flex style={styles.item} align='start'>
      <Flex style={styles.avatar} direction='column'>
        <UserStatus userId={userId}>
          <InView style={styles.inView} y={ITEM_HEIGHT * index + 1}>
            <Avatar
              src={`${HOST}/pic/user/l/${avatar}`}
              size={52}
              borderWidth={2}
              borderColor='rgba(255, 255, 255, 0.88)'
              radius={4}
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
        <Text style={_.mt.sm} type='__plain__' size={12} bold align='center'>
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

export default obc(Item)
