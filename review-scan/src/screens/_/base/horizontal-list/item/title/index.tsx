/*
 * @Author: czy0729
 * @Date: 2024-05-07 04:18:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-17 12:50:42
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { _ } from '@stores'
import { findSubjectCn, HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { WEB } from '@constants'

function Title({ id, name, findCn, typeCn, ellipsizeMode }) {
  const title = findCn ? findSubjectCn(name, id) : name
  const { length } = title
  const size = length >= 12 ? 9 : length >= 5 ? 10 : 11

  let numberOfLines = ellipsizeMode === 'middle' || typeCn === '音乐' ? 3 : 2
  if (WEB) numberOfLines += 1

  return (
    <View style={_.mt.sm}>
      <Text size={size} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode} bold>
        {HTMLDecode(title)}
      </Text>
    </View>
  )
}

export default ob(Title)
