/*
 * @Author: czy0729
 * @Date: 2020-02-02 04:15:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 06:10:00
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'
import { Avatar, InView, Name } from '../../base'
import { COMPONENT, ITEM_HEIGHT } from './ds'
import { memoStyles } from './styles'
import { Props as ItemPMProps } from './types'

export { ItemPMProps }

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
      <Component id='item-pm' data-key={id}>
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
            <View style={styles.avatar}>
              <InView style={styles.inView} y={ITEM_HEIGHT * index + 1}>
                <Avatar
                  navigation={navigation}
                  userId={userId}
                  name={name}
                  src={avatar}
                  event={event}
                />
              </InView>
            </View>
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
                  <Text style={_.mt.xs} type='title' size={13} lineHeight={16} numberOfLines={2}>
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
      </Component>
    )
  },
  COMPONENT
)
