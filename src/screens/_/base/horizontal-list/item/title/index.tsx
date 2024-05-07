/*
 * @Author: czy0729
 * @Date: 2024-05-07 04:18:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 06:01:49
 */
import React from 'react'
import { View } from 'react-native'
import { Katakana } from '@components'
import { _ } from '@stores'
import { findSubjectCn, HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import { styles } from './styles'

function Title({ id, name, findCn, typeCn, ellipsizeMode }) {
  const title = findCn ? findSubjectCn(name, id) : name
  const { length } = title
  const size = length >= 12 ? 9 : length >= 5 ? 10 : 11

  let numberOfLines = ellipsizeMode === 'middle' || typeCn === '音乐' ? 3 : 2
  if (STORYBOOK) numberOfLines += 1

  return (
    <View style={_.mt.sm}>
      <Katakana.Provider
        itemStyle={styles.itemStyle}
        itemSecondStyle={styles.itemSecondStyle}
        size={size}
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}
        bold
      >
        <Katakana size={size} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode} bold>
          {HTMLDecode(title)}
        </Katakana>
      </Katakana.Provider>
    </View>
  )
}

export default ob(Title)
