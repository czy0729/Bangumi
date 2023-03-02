/*
 * @Author: czy0729
 * @Date: 2019-07-24 13:59:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 19:19:43
 */
import React from 'react'
import Progress from '@ant-design/react-native/lib/progress'
import { Flex, Text, Touchable, UserStatus } from '@components'
import { _ } from '@stores'
// import { getRecentTimestamp, getTimestamp } from '@utils'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import { EVENT } from '@constants'
import { Avatar } from '../../base'
import Name from './name'
import Counts from './counts'
import { memoStyles } from './styles'
import { Props as ItemFriendsProps } from './types'

export { ItemFriendsProps }

export const ItemFriends = ob(
  ({
    navigation,
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
    const styles = memoStyles()
    const wrapWidth = _.window.contentWidth - 144
    return (
      <Touchable
        style={styles.container}
        animate
        onPress={() => {
          const { id, data = {} } = event
          t(id, {
            to: 'Zone',
            userId,
            ...data
          })

          navigation.push('Zone', {
            userId,
            _name: userName,
            _image: avatar
          })
        }}
      >
        <Flex>
          <UserStatus userId={userId}>
            <Avatar
              navigation={navigation}
              style={styles.image}
              name={userName}
              userId={userId}
              src={avatar}
            />
          </UserStatus>
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
      </Touchable>
    )
  }
)
