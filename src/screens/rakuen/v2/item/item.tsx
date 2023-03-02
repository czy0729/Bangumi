/*
 * @Author: czy0729
 * @Date: 2019-04-27 20:21:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 17:03:14
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, UserStatus } from '@components'
import { stl } from '@utils'
import { memo } from '@utils/decorators'
import Avatar from './avatar'
import Content from './content'
import BtnPopover from './btn-popover'
import IconFavor from './icon-favor'
import { DEFAULT_PROPS } from './ds'

export default memo(
  ({
    styles,
    avatar,
    userId,
    userName,
    groupHref,
    groupCn,
    href,
    title,
    time,
    topicId,
    replyCount,
    isReaded,
    isGroup,
    onPress
  }) => {
    global.rerender('Rakuen.Item.Main')

    return (
      <Touchable
        style={stl(styles.container, isReaded && styles.readed)}
        animate
        onPress={onPress}
      >
        <Flex align='start'>
          <View style={styles.avatar}>
            <UserStatus userId={userId}>
              <Avatar avatar={avatar} userName={userName} userId={userId} />
            </UserStatus>
          </View>
          <Flex.Item style={styles.wrap}>
            <Flex align='start'>
              <Flex.Item>
                <Content
                  groupCn={groupCn}
                  title={title}
                  time={time}
                  topicId={topicId}
                  replyCount={replyCount}
                  userId={userId}
                  userName={userName}
                  isReaded={isReaded}
                  isGroup={isGroup}
                />
              </Flex.Item>
              <BtnPopover
                groupCn={groupCn}
                groupHref={groupHref}
                href={href}
                topicId={topicId}
                userId={userId}
                userName={userName}
                isGroup={isGroup}
              />
            </Flex>
          </Flex.Item>
        </Flex>
        <IconFavor topicId={topicId} />
      </Touchable>
    )
  },
  DEFAULT_PROPS
)
