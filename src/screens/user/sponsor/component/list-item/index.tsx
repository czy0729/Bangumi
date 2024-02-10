/*
 * @Author: czy0729
 * @Date: 2023-01-07 21:53:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-10 13:54:19
 */
import React from 'react'
import { Flex, Text, UserStatus } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { USERS_MAP } from '../../ds'
import { COMPONENT } from './ds'
import { styles } from './styles'

function ListItem({ item }, { navigation }) {
  const data = USERS_MAP[item.data]
  const userId = data?.i || item.data
  return (
    <Flex style={styles.item}>
      <UserStatus userId={userId}>
        <Avatar
          navigation={navigation}
          src={data?.a ? `https://lain.bgm.tv/pic/user/l/000/${data?.a}.jpg` : ''}
          userId={userId}
          size={32}
        />
      </UserStatus>
      <Flex.Item style={_.ml.sm}>
        <Text size={12} bold>
          {data?.n}
        </Text>
        <Text size={10} type='sub'>
          @{userId}
        </Text>
      </Flex.Item>
    </Flex>
  )
}

export default obc(ListItem, COMPONENT)
