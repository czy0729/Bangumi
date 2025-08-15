/*
 * @Author: czy0729
 * @Date: 2022-09-28 17:24:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 07:42:04
 */
import React from 'react'
import { Flex, Text, Touchable, UserStatus } from '@components'
import { Avatar, VerticalAlign } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { FROZEN_FN, IOS } from '@constants'
import { COMPONENT_MAIN, DEFAULT_PROPS, IMG_WIDTH } from './ds'
import { styles } from './styles'

const HeaderTitle = memo(
  ({
    navigation,
    avatar = '',
    userId = '',
    userName = '',
    title = '',
    group = '',
    onScrollToTop = FROZEN_FN
  }) => {
    const texts = [userName || group, group].filter(item => !!item).join(' · ')
    const el = (
      <>
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
      </>
    )

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
          {IOS ? (
            el
          ) : (
            <Touchable withoutFeedback onPress={onScrollToTop}>
              {el}
            </Touchable>
          )}
        </Flex.Item>
      </Flex>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default HeaderTitle
