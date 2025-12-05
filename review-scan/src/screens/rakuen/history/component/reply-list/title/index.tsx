/*
 * @Author: czy0729
 * @Date: 2024-06-10 22:17:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-10 22:19:42
 */
import React, { useState } from 'react'
import { Text } from '@components'

function Title({ children, numberOfLines, ...other }) {
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
