/*
 * @Author: czy0729
 * @Date: 2024-08-21 18:35:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-21 18:40:28
 */
import React from 'react'
import { View } from 'react-native'
import { Highlight, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function Title({ title, desc, collect, filter }) {
  return (
    <View style={_.container.block}>
      <Highlight bold numberOfLines={3} value={filter} t2s={false}>
        {title}
      </Highlight>
      {!!desc && desc !== title && (
        <Text
          style={_.mt.sm}
          size={11}
          numberOfLines={(collect ? 2 : 3) - (title.length >= 40 ? 1 : 0)}
        >
          {desc}
        </Text>
      )}
      {!!collect && (
        <Text style={_.mt.xs} size={10} lineHeight={14} type='sub' bold>
          {collect} 人收藏
        </Text>
      )}
    </View>
  )
}

export default ob(Title)
