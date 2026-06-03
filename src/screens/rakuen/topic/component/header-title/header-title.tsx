/*
 * @Author: czy0729
 * @Date: 2022-09-28 17:24:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-15 23:32:38
 */
import React, { useMemo } from 'react'
import { Flex, Text, Touchable, UserStatus } from '@components'
import { Avatar, Cover, VerticalAlign } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { FROZEN_FN, IOS } from '@constants'
import { COMPONENT_MAIN, DEFAULT_PROPS, IMG_WIDTH } from './ds'
import { styles } from './styles'

const HeaderTitle = memo(
  ({
    avatar = '',
    userId = '',
    userName = '',
    title = '',
    group = '',
    onScrollToTop = FROZEN_FN
  }) => {
    const navigation = useNavigation()

    const isCover = typeof avatar === 'string' && avatar.includes('pic/cover')
    const texts = [userName || group, group].filter(item => !!item).join(' · ')

    const el = useMemo(
      () => (
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
      ),
      [group, texts, title, userName]
    )

    return (
      <Flex style={styles.container}>
        {!!avatar && isCover ? (
          <Cover key={String(avatar)} src={avatar} size={IMG_WIDTH} radius={_.radiusXs} />
        ) : (
          <UserStatus userId={userId} mini>
            <Avatar
              key={String(avatar)}
              navigation={navigation}
              size={IMG_WIDTH}
              src={avatar}
              userId={userId}
              name={userName}
              radius={_.radiusXs}
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
