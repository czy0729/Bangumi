/*
 * @Author: czy0729
 * @Date: 2024-05-07 04:50:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-14 14:51:51
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Katakana, Touchable } from '@components'
import { _ } from '@stores'
import { styles } from './styles'

const REASON_MAP = {
  同期热话: '同期大热',
  风格关联: '风格相近'
} as const

function Desc({ item, typeCn, onPress }) {
  const text = String(item?.desc || item?.reason || '')
  if (!text) return null

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
        size={text.length >= 6 ? 9 : 10}
        numberOfLines={2}
        bold
      >
        <Katakana type='sub' size={text.length >= 6 ? 9 : 10} numberOfLines={2} bold>
          {REASON_MAP[text] || text}
        </Katakana>
      </Katakana.Provider>
    </Touchable>
  )
}

export default observer(Desc)
