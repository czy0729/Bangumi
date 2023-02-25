/*
 * @Author: czy0729
 * @Date: 2019-08-08 09:59:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-25 23:33:57
 */
import React from 'react'
import { Flex, Text, Touchable, UserStatus } from '@components'
import { _, timelineStore } from '@stores'
import { appNavigate } from '@utils'
import { ob } from '@utils/decorators'
import { EVENT } from '@constants'
import { Avatar, Name, Tag } from '../../base'
import { memoStyles } from './styles'
import { Props as ItemNotifyProps } from './types'

export { ItemNotifyProps }

export const ItemNotify = ob(
  ({
    navigation,
    avatar,
    userId,
    userName,
    title,
    message,
    message2,
    href,
    repeat,
    event = EVENT,
    children
  }: ItemNotifyProps) => {
    const styles = memoStyles()

    let sayTitle: string
    const notifyId = String(href).split('/status/')?.[1]
    if (notifyId) {
      const say = timelineStore.say(notifyId)
      if (say.list.length) sayTitle = say.list[0]?.text
    }
    return (
      <Flex style={styles.container} align='start'>
        <UserStatus userId={userId}>
          <Avatar
            key={String(avatar)}
            style={styles.image}
            navigation={navigation}
            userId={userId}
            name={userName}
            src={avatar}
            event={event}
          />
        </UserStatus>
        <Flex.Item style={styles.item}>
          <Name userId={userId} showFriend size={13} type='title' bold>
            {userName}
          </Name>
          <Flex style={_.mt.xs} align='start'>
            <Flex.Item>
              <Touchable
                onPress={() => {
                  appNavigate(
                    href,
                    navigation,
                    {
                      _title: title
                    },
                    event
                  )
                }}
              >
                <Text lineHeight={18}>
                  {message}
                  <Text lineHeight={18} type='main' bold>
                    {title}
                  </Text>
                  {message2}
                </Text>
              </Touchable>
              {!!sayTitle && (
                <Text
                  style={styles.desc}
                  type='sub'
                  size={11}
                  lineHeight={18}
                  numberOfLines={1}
                >
                  描述：{sayTitle}
                </Text>
              )}
            </Flex.Item>
            <Flex style={styles.tag} justify='end'>
              {!!repeat && <Tag value={`x${repeat + 1}`} />}
            </Flex>
          </Flex>
        </Flex.Item>
        {children}
      </Flex>
    )
  }
)
