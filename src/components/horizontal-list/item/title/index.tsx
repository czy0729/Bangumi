/*
 * @Author: czy0729
 * @Date: 2024-05-07 04:18:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-06 17:41:31
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { findSubjectCn, HTMLDecode } from '@utils'
import { WEB } from '@constants'
import { Text } from '../../../text'

import type { Props } from './types'

function Title({ id, name, findCn, typeCn, ellipsizeMode }: Props) {
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

export default observer(Title)
