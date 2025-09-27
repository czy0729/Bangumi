/*
 * @Author: czy0729
 * @Date: 2025-01-26 13:34:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-26 13:36:15
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { systemStore } from '@stores'
import { correctAgo } from '@utils'
import { ob } from '@utils/decorators'
import { Name, UserAge } from '../../../base'
import { formatTime } from '../utils'
import { styles } from './styles'

function Top({ userId, userName, avatar, time, status }) {
  return (
    <Flex>
      <View style={systemStore.setting.userAge && styles.name}>
        <Name
          size={14}
          bold
          userId={userId}
          showFriend
          right={
            <Text type='sub' size={11} lineHeight={14}>
              {'  '}
              {status ? `${status} · ` : ''}
              {String(time).includes('ago') ? correctAgo(formatTime(time)) : time}
            </Text>
          }
        >
          {userName}
        </Name>
      </View>
      {systemStore.setting.userAge && (
        <Flex.Item>
          <UserAge style={styles.userAge} value={userId} avatar={avatar} />
        </Flex.Item>
      )}
    </Flex>
  )
}

export default ob(Top)
