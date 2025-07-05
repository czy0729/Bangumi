/*
 * @Author: czy0729
 * @Date: 2025-03-04 19:21:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-15 07:04:56
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Flex, Text, UserStatus } from '@components'
import { InView } from '@_'
import { _, tinygrailStore, useStore } from '@stores'
import { HTMLDecode } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import Menu from '../menu'
import Mono from '../mono'
import Users from '../users'
import { COMPONENT, ITEM_HEIGHT } from './ds'
import { memoStyles } from './styles'

function Item({ id, index }) {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => {
    const detail = $.detail(id)
    if (!detail) return null

    const styles = memoStyles()
    const likes = $.likes(id)
    return (
      <Flex style={styles.item} align='start'>
        <Flex style={styles.avatar} direction='column'>
          <UserStatus userId={detail?.userId}>
            <InView style={styles.inView} y={ITEM_HEIGHT * (index + 1)}>
              <View style={styles.shadow}>
                <Avatar
                  navigation={navigation}
                  src={detail?.avatar}
                  size={52}
                  borderWidth={2}
                  borderColor={_.select(_.colorBorder, 'rgba(255, 255, 255, 0.88)')}
                  radius={_.radiusSm}
                  userId={detail?.userId}
                  name={detail?.name}
                  onLongPress={() => {
                    tinygrailStore.alertUserAssets(detail?.userId, detail?.name)
                  }}
                />
              </View>
            </InView>
          </UserStatus>
          <Text style={_.mt.sm} size={12} bold align='center'>
            {HTMLDecode(detail?.name)}
          </Text>
        </Flex>
        <Flex.Item>
          <View
            style={[
              styles.content,
              {
                backgroundColor: detail?.color || 'transparent'
              }
            ]}
          >
            <Text type='__plain__' lineHeight={17} bold shadow selectable>
              {detail?.detail?.replace(/\n\n/g, '\n')}
            </Text>
            {!!detail?.monoAvatar && <Mono id={id} />}
            <View style={styles.border} />
          </View>
          <Flex style={_.mt.xs}>
            <Flex.Item>{!!likes?.list?.length && <Users id={id} />}</Flex.Item>
            <Menu id={id} />
          </Flex>
        </Flex.Item>
      </Flex>
    )
  })
}

export default Item
