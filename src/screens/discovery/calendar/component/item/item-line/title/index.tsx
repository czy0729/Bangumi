/*
 * @Author: czy0729
 * @Date: 2024-03-29 04:41:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 03:44:30
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Katakana } from '@components'
import { _ } from '@stores'
import { HTMLDecode } from '@utils'
import { styles } from './styles'

function Title({ name }) {
  const title = HTMLDecode(name)
  const size = title.length >= 20 ? 12 : title.length >= 14 ? 13 : 14

  return (
    <View style={_.container.block}>
      <Katakana.Provider itemStyle={styles.katakanas} size={size} numberOfLines={3} bold>
        <Katakana type='desc' size={size} numberOfLines={3} bold>
          {title}
        </Katakana>
      </Katakana.Provider>
    </View>
  )
}

export default observer(Title)
