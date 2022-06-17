/*
 * @Author: czy0729
 * @Date: 2019-07-24 13:59:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-17 13:13:45
 */
import React from 'react'
import Progress from '@ant-design/react-native/lib/progress'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { ob } from '@utils/decorators'
import { EVENT } from '@constants'
import { Avatar } from '../../base'
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
    dropped,
    event = EVENT,
    children,
    onHold
  }: ItemFriendsProps) => {
    const styles = memoStyles()
    const wrapWidth = _.window.contentWidth - 144
    return (
      <Touchable
        style={styles.container}
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
          <Avatar
            navigation={navigation}
            style={styles.image}
            name={userName}
            userId={userId}
            src={avatar}
          />
          <Flex.Item style={styles.item}>
            <Flex>
              <Flex.Item>
                <Text numberOfLines={1} bold>
                  {userName}
                </Text>
              </Flex.Item>
              <Text style={_.ml.sm} size={13}>
                {recent}
              </Text>
            </Flex>
            <Flex style={styles.count}>
              {!!collect && (
                <>
                  <Iconfont
                    style={_.mr.xs}
                    name='md-check'
                    size={14}
                    color={_.colorSub}
                  />
                  <Text style={_.mr.sm} size={11} type='sub'>
                    {collect}
                  </Text>
                </>
              )}
              {!!wish && (
                <>
                  <Iconfont
                    style={_.mr.xs}
                    name='md-favorite'
                    size={12}
                    color={_.colorSub}
                  />
                  <Text style={_.mr.sm} size={11} type='sub'>
                    {wish}
                  </Text>
                </>
              )}
              {!!doing && (
                <>
                  <Iconfont
                    style={_.mr.xs}
                    name='md-visibility'
                    size={14}
                    color={_.colorSub}
                  />
                  <Text style={_.mr.sm} size={11} type='sub'>
                    {doing}
                  </Text>
                </>
              )}
              {!!onHold && (
                <>
                  <Iconfont
                    style={_.mr.xs}
                    name='md-visibility-off'
                    size={13}
                    color={_.colorSub}
                  />
                  <Text style={_.mr.sm} size={11} type='sub'>
                    {onHold}
                  </Text>
                </>
              )}
              {!!dropped && (
                <>
                  <Iconfont
                    style={_.mr.xs}
                    name='md-delete-outline'
                    size={14}
                    color={_.colorSub}
                  />
                  <Text size={11} type='sub'>
                    {dropped}
                  </Text>
                </>
              )}
            </Flex>
            <Progress
              style={styles.progress}
              barStyle={styles.bar}
              wrapWidth={wrapWidth}
              percent={percent}
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
