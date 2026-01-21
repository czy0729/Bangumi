/*
 * @Author: czy0729
 * @Date: 2024-04-12 02:17:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-21 10:59:43
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Flex, Highlight, Touchable, UserStatus } from '@components'
import { InView, Name } from '@_'
import { _, useStore } from '@stores'
import { getVisualLength, HTMLDecode } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Friend } from '@stores/users/types'
import type { RenderItem } from '@types'
import type { Ctx } from '../../types'

function Item({ index, item }: RenderItem<Friend>) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    const { filter } = $.state
    const { userId, avatar, userName } = item
    const name = HTMLDecode(userName)
    const visualLength = getVisualLength(name)

    const textProps = {
      style: _.mt.sm,
      size: visualLength > 7 ? 8 : visualLength > 6 ? 9 : visualLength > 5 ? 10 : 11,
      lineHeight: 11,
      bold: true,
      numberOfLines: 1
    } as const

    return (
      <View style={styles.item}>
        <Touchable
          animate
          scale={0.9}
          onPress={() => {
            navigation.push('Zone', {
              userId,
              _name: userName,
              _image: avatar
            })

            t('好友.跳转', {
              to: 'Zone',
              userId
            })
          }}
        >
          <InView style={styles.inView} y={110 * (Math.floor(index / $.numColumns) + 1)}>
            <UserStatus userId={userId}>
              <Avatar size={styles.item.width} src={avatar} radius />
            </UserStatus>
          </InView>
          <Flex>
            {filter ? (
              <Highlight {...textProps} value={filter}>
                {name}
              </Highlight>
            ) : (
              <Name {...textProps} userId={userId}>
                {name}
              </Name>
            )}
          </Flex>
          <Highlight style={_.mt.xs} type='sub' size={9} bold numberOfLines={1} value={filter}>
            {userId}
          </Highlight>
        </Touchable>
      </View>
    )
  })
}

export default Item
