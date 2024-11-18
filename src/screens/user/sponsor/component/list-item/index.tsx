/*
 * @Author: czy0729
 * @Date: 2023-01-07 21:53:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-10 13:39:23
 */
import React from 'react'
import { Flex, Text, UserStatus } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { IMG_DEFAULT_AVATAR } from '@constants'
import { NavigationProps } from '@types'
import { USERS_MAP } from '../../ds'
import { COMPONENT } from './ds'
import { styles } from './styles'

function ListItem({ item }, { navigation }: NavigationProps) {
  const data = USERS_MAP[item.data]
  const userId = item.data
  return (
    <Flex style={styles.item}>
      <UserStatus userId={userId}>
        <Avatar
          navigation={navigation}
          src={data?.a ? `https://lain.bgm.tv/pic/user/l/000/${data?.a}.jpg` : IMG_DEFAULT_AVATAR}
          name={data?.n}
          userId={userId}
          size={32}
        />
      </UserStatus>
      <Flex.Item style={_.ml.sm}>
        <Text size={12} bold>
          {HTMLDecode(data?.n)}
        </Text>
        <Text size={10} type='sub'>
          @{userId}
        </Text>
      </Flex.Item>
    </Flex>
  )
}

export default ob(ListItem, COMPONENT)
