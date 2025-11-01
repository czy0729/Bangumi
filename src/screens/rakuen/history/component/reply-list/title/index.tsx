/*
 * @Author: czy0729
 * @Date: 2024-06-10 22:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-01 18:27:59
 */
import React, { useState } from 'react'
import { Text } from '@components'

import type { TextProps } from '@components'

function Title({ children, numberOfLines, ...other }: TextProps) {
  const [lines, setLines] = useState(numberOfLines)

  return (
    <Text
      {...other}
      numberOfLines={lines}
      onPress={() => {
        setLines(0)
      }}
    >
      {children}
    </Text>
  )
}

export default Title
