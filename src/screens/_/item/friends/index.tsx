/*
 * @Author: czy0729
 * @Date: 2019-07-24 13:59:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-12 05:03:11
 */
import React from 'react'
import { View } from 'react-native'
import Progress from '@ant-design/react-native/lib/progress'
import { Avatar, Component, Flex, Link, Text, UserStatus } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { EVENT } from '@constants'
import Counts from './counts'
import Name from './name'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as ItemFriendsProps } from './types'

export { ItemFriendsProps }

export const ItemFriends = ({
  avatar,
  userId,
  userName,
  hobby,
  percent,
  recent,
  doing,
  collect,
  wish,
  onHold,
  dropped,
  filter,
  event = EVENT,
  children
}: ItemFriendsProps) => {
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    const wrapWidth = _.window.contentWidth - 144

    return (
      <Component id='item-friends' data-key={userId}>
        <Link
          style={styles.container}
          path='Zone'
          getParams={() => ({
            userId,
            _name: userName,
            _image: avatar
          })}
          eventId={event.id}
          getEventData={() => ({
            to: 'Zone',
            userId,
            ...event.data
          })}
        >
          <Flex>
            <View style={styles.avatar}>
              <UserStatus userId={userId}>
                <Avatar name={userName} userId={userId} src={avatar} />
              </UserStatus>
            </View>
            <Flex.Item style={styles.item}>
              <Flex>
                <Flex.Item>
                  <Name userName={userName} filter={filter} />
                </Flex.Item>
                <Text style={_.ml.sm} size={13}>
                  {recent}
                </Text>
              </Flex>
              <Counts
                wish={wish}
                collect={collect}
                doing={doing}
                onHold={onHold}
                dropped={dropped}
              />
              <Progress
                style={styles.progress}
                barStyle={styles.bar}
                wrapWidth={wrapWidth}
                percent={Number(percent)}
              />
            </Flex.Item>
            <Text style={styles.hobby} size={12} type='sub'>
              {hobby || '-'} / {percent || '-'}%
            </Text>
          </Flex>
          {children}
        </Link>
      </Component>
    )
  })
}

export default ItemFriends
