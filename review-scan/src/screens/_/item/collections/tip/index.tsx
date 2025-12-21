/*
 * @Author: czy0729
 * @Date: 2025-01-24 06:05:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-24 06:10:20
 */
import React from 'react'
import { Text } from '@components'
import { HTMLDecode } from '@utils'
import { ob } from '@utils/decorators'

function Tip({ name, nameCn, numberOfLines, value }) {
  const titleLength = name.length + nameCn.length
  return (
    <Text
      size={11}
      lineHeight={12}
      numberOfLines={Math.max(2, numberOfLines - (titleLength >= 36 ? 1 : 0))}
    >
      {HTMLDecode(value)}
    </Text>
  )
}

export default ob(Tip)
