/*
 * @Author: czy0729
 * @Date: 2024-04-12 02:17:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-13 05:15:47
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Text, Touchable } from '@components'
import { Name } from '@_'
import { _ } from '@stores'
import { HTMLDecode, stl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function ItemGrid({ index, item }, { navigation }: Ctx) {
  const styles = memoStyles()
  const { userId, avatar, userName } = item
  return (
    <View style={stl(styles.item, index % _.portrait(5, 8) === 0 && styles.left)}>
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
        <Avatar size={styles.item.width} src={avatar} radius />
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

export default obc(ItemGrid, COMPONENT)
