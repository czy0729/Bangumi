/*
 * @Author: czy0729
 * @Date: 2020-02-02 04:15:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-17 20:00:50
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { HTMLDecode } from '@utils/html'
import { ob } from '@utils/decorators'
import { EVENT } from '@constants'
import { Avatar, Name } from '../../base'
import { memoStyles } from './styles'
import { Props as ItemPMProps } from './types'

export { ItemPMProps }

export const ItemPM = ob(
  ({
    navigation,
    event = EVENT,
    id,
    title,
    content,
    avatar,
    name,
    userId,
    time,
    new: isNew,
    onRefresh = () => {}
  }: ItemPMProps) => {
    const styles = memoStyles()
    return (
      <Flex style={styles.container} align='start'>
        <Avatar
          style={styles.image}
          navigation={navigation}
          userId={userId}
          name={name}
          src={avatar}
          event={event}
        />
        <Flex.Item style={styles.item}>
          <Touchable
            onPress={() => {
              t(event.id, {
                to: 'PM',
                ...event.data
              })

              navigation.push('PM', {
                id
              })

              if (isNew) {
                setTimeout(() => {
                  onRefresh()
                }, 4000)
              }
            }}
          >
            <Flex>
              <Flex.Item>
                <Name
                  userId={userId}
                  showFriend
                  size={13}
                  type='title'
                  bold
                  right={
                    <Text size={11} lineHeight={13} type='sub'>
                      {' '}
                      {time}
                    </Text>
                  }
                >
                  {name}
                </Name>
                <Text style={_.mt.xs} type='main' bold>
                  {title}
                </Text>
                <Text style={_.mt.sm} size={13} lineHeight={16} type='title'>
                  {HTMLDecode(content)}
                </Text>
              </Flex.Item>
              {isNew && (
                <Text style={_.ml.sm} type='danger'>
                  new
                </Text>
              )}
            </Flex>
          </Touchable>
        </Flex.Item>
      </Flex>
    )
  }
)
