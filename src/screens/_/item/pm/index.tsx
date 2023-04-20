/*
 * @Author: czy0729
 * @Date: 2020-02-02 04:15:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 15:44:00
 */
import React from 'react'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { HTMLDecode } from '@utils/html'
import { ob } from '@utils/decorators'
import { EVENT } from '@constants'
import { InView, Avatar, Name } from '../../base'
import { memoStyles } from './styles'
import { Props as ItemPMProps } from './types'

export { ItemPMProps }

const ITEM_HEIGHT = 98

export const ItemPM = ob(
  ({
    navigation,
    event = EVENT,
    index,
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
      <Touchable
        animate
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
        <Flex style={styles.container} align='start'>
          <InView style={styles.inView} y={ITEM_HEIGHT * index + 1}>
            <Avatar
              style={styles.image}
              navigation={navigation}
              userId={userId}
              name={name}
              src={avatar}
              event={event}
            />
          </InView>
          <Flex.Item style={styles.item}>
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
          </Flex.Item>
        </Flex>
      </Touchable>
    )
  }
)
