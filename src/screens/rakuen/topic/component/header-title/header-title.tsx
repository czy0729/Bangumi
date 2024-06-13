/*
 * @Author: czy0729
 * @Date: 2022-09-28 17:24:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-14 00:32:51
 */
import React from 'react'
import { Flex, Text, UserStatus } from '@components'
import { Avatar, VerticalAlign } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { COMPONENT_MAIN, DEFAULT_PROPS, IMG_WIDTH } from './ds'
import { styles } from './styles'

const HeaderTitle = memo(
  ({ navigation, avatar, userId, userName, title, group }) => {
    const texts = [userName || group, group].filter(item => !!item).join(' · ')
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
          {!!texts && (
            <VerticalAlign
              type='sub'
              text={userName || group}
              size={10}
              lineHeight={12}
              bold
              numberOfLines={1}
            >
              {texts}
            </VerticalAlign>
          )}
        </Flex.Item>
      </Flex>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default HeaderTitle
