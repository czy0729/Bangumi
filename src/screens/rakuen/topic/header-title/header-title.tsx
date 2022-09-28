/*
 * @Author: czy0729
 * @Date: 2022-09-28 17:24:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-28 17:28:40
 */
import React from 'react'
import { Flex, Text, UserStatus } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { IMG_WIDTH, DEFAULT_PROPS } from './ds'
import { styles } from './styles'

export default memo(({ navigation, avatar, userId, userName, title, group }) => {
  global.rerender('Topic.HeaderTitle.Main')

  return (
    <Flex style={styles.container}>
      {!!avatar && (
        <UserStatus userId={userId}>
          <Avatar
            navigation={navigation}
            size={IMG_WIDTH}
            src={avatar}
            userId={userId}
            name={userName}
          />
        </UserStatus>
      )}
      <Flex.Item style={_.ml.sm}>
        <Text size={13} numberOfLines={1}>
          {title}
        </Text>
        {!!(userName || group) && (
          <Text type='sub' size={10} bold numberOfLines={1}>
            {userName || group}
          </Text>
        )}
      </Flex.Item>
    </Flex>
  )
}, DEFAULT_PROPS)
