/*
 * @Author: czy0729
 * @Date: 2020-02-02 04:15:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-17 13:35:53
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Component, Flex, Link, Text } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { EVENT, FROZEN_FN } from '@constants'
import { InView, Name } from '../../base'
import { COMPONENT, ITEM_HEIGHT } from './ds'
import { memoStyles } from './styles'
import { Props as ItemPMProps } from './types'

export { ItemPMProps }

export const ItemPM = ({
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
  onRefresh = FROZEN_FN
}: ItemPMProps) => {
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <Component id='item-pm' data-key={id}>
        <Link
          path='PM'
          getParams={() => ({
            id,
            _userId: userId
          })}
          eventId={event.id}
          getEventData={() => ({
            to: 'PM',
            ...event.data
          })}
          onPress={() => {
            if (!isNew) return

            setTimeout(() => {
              onRefresh()
            }, 4000)
          }}
        >
          <Flex style={styles.container} align='start'>
            <View style={styles.avatar}>
              <InView style={styles.inView} y={ITEM_HEIGHT * (index + 1)}>
                <Avatar key={avatar} userId={userId} name={name} src={avatar} event={event} />
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
                        {'  '}
                        {time}
                      </Text>
                    }
                  >
                    {name}
                  </Name>
                  <Text style={_.mt.xs} type='main' bold>
                    {title}
                  </Text>
                  <Flex>
                    <View style={styles.info}>
                      <Text size={13} lineHeight={15}>
                        {HTMLDecode(content)}
                      </Text>
                    </View>
                  </Flex>
                </Flex.Item>
                {isNew && (
                  <Text style={_.ml.sm} type='danger'>
                    new
                  </Text>
                )}
              </Flex>
            </Flex.Item>
          </Flex>
        </Link>
      </Component>
    )
  })
}

export default ItemPM
