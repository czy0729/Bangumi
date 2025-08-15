/*
 * @Author: czy0729
 * @Date: 2024-04-12 02:17:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:47:06
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Text, Touchable } from '@components'
import { InView, Name } from '@_'
import { _, useStore } from '@stores'
import { HTMLDecode, stl } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function ItemGrid({ index, item }) {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const { userId, avatar, userName } = item
  return (
    <View style={stl(styles.item, index % $.numColumns === 0 && styles.left)}>
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
        <InView style={styles.inView} y={120 * (Math.floor(index / $.numColumns) + 1)}>
          <Avatar size={styles.item.width} src={avatar} radius />
        </InView>
        <Name style={_.mt.sm} size={11} bold userId={userId}>
          {HTMLDecode(userName)}
        </Name>
        <Text style={_.mt.xs} type='sub' size={9} numberOfLines={1} bold>
          @{userId}
        </Text>
      </Touchable>
    </View>
  )
}

export default ob(ItemGrid, COMPONENT)
