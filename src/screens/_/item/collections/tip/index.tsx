/*
 * @Author: czy0729
 * @Date: 2025-01-24 06:05:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-24 12:04:45
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { HTMLDecode } from '@utils'

function Tip({ style, name, nameCn, numberOfLines, value }) {
  const titleLength = name.length + nameCn.length

  return (
    <Text
      style={style}
      size={11}
      lineHeight={12}
      numberOfLines={Math.max(2, numberOfLines - (titleLength >= 36 ? 1 : 0))}
    >
      {HTMLDecode(value)}
    </Text>
  )
}

export default observer(Tip)
