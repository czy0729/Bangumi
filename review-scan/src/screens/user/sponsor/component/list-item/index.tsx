/*
 * @Author: czy0729
 * @Date: 2023-01-07 21:53:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-08 10:44:07
 */
import React from 'react'
import { Flex, Text, UserStatus } from '@components'
import { Avatar, InView } from '@_'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { IMG_DEFAULT_AVATAR } from '@constants'
import { USERS_MAP } from '../../ds'
import { COMPONENT } from './ds'
import { styles } from './styles'

function ListItem({ item, index }) {
  const navigation = useNavigation()
  const data = USERS_MAP[item.data]
  const userId = item.data

  let level = ''
  if (item.weight >= 100) {
    level = '\u{1F947}'
  } else if (item.weight >= 50) {
    level = '\u{1F948}'
  } else if (item.weight >= 20) {
    level = '\u{1F949}'
  }

  return (
    <Flex style={styles.item}>
      <InView style={styles.inView} y={48 * (Math.floor(index / 2) + 1)}>
        <UserStatus userId={userId}>
          <Avatar
            navigation={navigation}
            src={data?.a ? `https://lain.bgm.tv/pic/user/l/000/${data?.a}.jpg` : IMG_DEFAULT_AVATAR}
            name={data?.n}
            userId={userId}
            size={32}
          />
        </UserStatus>
      </InView>
      <Flex.Item style={_.ml.sm}>
        <Flex>
          <Flex.Item>
            <Text size={12} bold numberOfLines={1}>
              {HTMLDecode(data?.n)}
            </Text>
            <Text size={10} lineHeight={12} type='sub'>
              @{userId}
            </Text>
          </Flex.Item>
          <Text style={styles.level} size={16}>
            {level}
          </Text>
        </Flex>
      </Flex.Item>
    </Flex>
  )
}

export default ob(ListItem, COMPONENT)
