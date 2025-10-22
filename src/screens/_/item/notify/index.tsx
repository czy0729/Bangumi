/*
 * @Author: czy0729
 * @Date: 2019-08-08 09:59:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-12 06:00:35
 */
import React from 'react'
import { Component, Flex, Link } from '@components'
import { getUserIdFromAvatar } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { EVENT } from '@constants'
import Avatar from './avatar'
import Content from './content'
import Extra from './extra'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as ItemNotifyProps } from './types'

export type { ItemNotifyProps }

export const ItemNotify = ({
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
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    let connectUserId = 0
    if (message.includes('请求与你成为好友')) {
      connectUserId = getUserIdFromAvatar(avatar)
    }

    const elBody = (
      <Flex style={styles.container} align='start'>
        <Avatar
          key={avatar}
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
          <Link
            path={href}
            appNavigate
            getParams={() => ({
              _title: title
            })}
            eventId={event.id}
            eventData={event.data}
          >
            {elBody}
          </Link>
        )}
      </Component>
    )
  })
}

export default ItemNotify
