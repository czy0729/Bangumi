/*
 * @Author: czy0729
 * @Date: 2025-01-25 23:11:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 19:38:06
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { _ } from '@stores'
import { HTMLDecode, stl } from '@utils'
import { styles } from './styles'

function Tip({ tip, isMusic }) {
  return (
    <Text
      style={stl(styles.tip, isMusic && _.mt.xs)}
      size={11}
      lineHeight={14}
      numberOfLines={isMusic ? 2 : 3}
    >
      {HTMLDecode(tip)}
    </Text>
  )
}

export default observer(Tip)
