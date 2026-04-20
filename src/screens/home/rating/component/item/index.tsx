/*
 * @Author: czy0729
 * @Date: 2020-07-28 11:59:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 11:37:29
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, UserStatus } from '@components'
import { Avatar, Stars, UserAge } from '@_'
import { _ } from '@stores'
import { getVisualLength, simpleTime } from '@utils'
import { useNavigation } from '@utils/hooks'
import { COMPONENT, EVENT } from './ds'
import { memoStyles } from './styles'

import type { RatingItem } from '@stores/subject/types'
import type { WithIndex } from '@types'

function Item({ id, avatar, name, time, star, comment }: WithIndex<RatingItem>) {
  const navigation = useNavigation(COMPONENT)

  const styles = memoStyles()

  const recent = simpleTime(time).split(' ')?.[0] || ''
  const visualLength = getVisualLength(name)

  return (
    <View style={styles.container}>
      <Flex>
        <UserStatus userId={id}>
          <Avatar navigation={navigation} size={36} event={EVENT} userId={id} src={avatar} radius />
        </UserStatus>

        <Flex.Item style={_.ml.sm}>
          <Flex>
            <Text
              size={visualLength >= 8 ? 10 : visualLength >= 6 ? 11 : 12}
              bold
              numberOfLines={1}
            >
              {name}
            </Text>
            <Flex.Item>
              <UserAge value={id} avatar={avatar} />
            </Flex.Item>
          </Flex>
          <View style={_.mt.xs}>
            {star ? (
              <Stars value={star} size={10} extraText={` · ${recent}`} />
            ) : (
              <Text size={10} lineHeight={12} type='sub' bold>
                {recent}
              </Text>
            )}
          </View>
        </Flex.Item>
      </Flex>

      {!!comment && (
        <Flex style={_.mt.xs}>
          <Text style={styles.comment} size={12} lineHeight={14} selectable>
            {comment}
          </Text>
        </Flex>
      )}
    </View>
  )
}

export default observer(Item)
