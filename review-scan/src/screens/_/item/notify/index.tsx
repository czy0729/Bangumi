/*
 * @Author: czy0729
 * @Date: 2019-08-08 09:59:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-17 13:36:09
 */
import React from 'react'
import { Component, Flex, Touchable } from '@components'
import { appNavigate, getUserIdFromAvatar } from '@utils'
import { ob } from '@utils/decorators'
import { EVENT } from '@constants'
import Avatar from './avatar'
import Content from './content'
import Extra from './extra'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as ItemNotifyProps } from './types'

export { ItemNotifyProps }

export const ItemNotify = ob(
  ({
    navigation,
    index,
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

    let connectUserId = 0
    if (message.includes('请求与你成为好友')) {
      connectUserId = getUserIdFromAvatar(avatar)
    }

    const elBody = (
      <Flex style={styles.container} align='start'>
        <Avatar
          key={avatar}
          navigation={navigation}
          index={index}
          avatar={avatar}
          userId={userId}
          userName={userName}
          event={event}
        />
        <Flex.Item style={styles.content}>
          <Flex>
            <Flex.Item>
              <Content
                userId={userId}
                userName={userName}
                title={title}
                message={message}
                message2={message2}
                href={href}
              />
            </Flex.Item>
            <Extra userId={userId} connectUserId={connectUserId} repeat={repeat} />
          </Flex>
        </Flex.Item>
        {children}
      </Flex>
    )

    return (
      <Component id='item-notify' data-key={href}>
        {connectUserId ? (
          elBody
        ) : (
          <Touchable
            animate
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
            {elBody}
          </Touchable>
        )}
      </Component>
    )
  },
  COMPONENT
)

export default ItemNotify
