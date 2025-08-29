/*
 * @Author: czy0729
 * @Date: 2024-05-07 04:50:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 06:01:53
 */
import React from 'react'
import { Katakana, Touchable } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { styles } from './styles'

function Desc({ item, typeCn, onPress }) {
  if (!item.desc) return null

  const desc = String(item.desc || '')
  return (
    <Touchable
      style={_.mt.xs}
      animate
      scale={0.85}
      onPress={() => {
        onPress(item, typeCn)
      }}
    >
      <Katakana.Provider
        itemStyle={styles.itemStyle}
        type='sub'
        size={desc.length >= 6 ? 9 : 10}
        numberOfLines={2}
        bold
      >
        <Katakana type='sub' size={desc.length >= 6 ? 9 : 10} numberOfLines={2} bold>
          {desc}
        </Katakana>
      </Katakana.Provider>
    </Touchable>
  )
}

export default ob(Desc)
