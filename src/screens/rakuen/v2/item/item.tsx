/*
 * @Author: czy0729
 * @Date: 2019-04-27 20:21:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 11:27:28
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { _ } from '@stores'
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
    group,
    groupHref,
    groupCn,
    href,
    title,
    time,
    topicId,
    replyCount,
    isReaded,
    isGroup
  }) => {
    global.rerender('Rakuen.Item.Main')

    return (
      <View style={[_.container.item, styles.container, isReaded && styles.readed]}>
        <Flex align='start'>
          <View style={styles.avatar}>
            <Avatar avatar={avatar} userName={userName} userId={userId} />
          </View>
          <Flex.Item style={styles.wrap}>
            <Flex align='start'>
              <Flex.Item>
                <Content
                  avatar={avatar}
                  group={group}
                  groupCn={groupCn}
                  href={href}
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
        {/* <Heatmap
          id='超展开.跳转'
          to='Topic'
          alias='帖子'
        /> */}
      </View>
    )
  },
  DEFAULT_PROPS
)
