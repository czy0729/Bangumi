/*
 * @Author: czy0729
 * @Date: 2025-01-24 05:45:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-24 05:48:33
 */
import React from 'react'
import { Text } from '@components'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function Comments({ value }) {
  const styles = memoStyles()
  return (
    <Text
      style={styles.comments}
      size={value.length >= 80 ? 12 : value.length >= 40 ? 13 : 14}
      lineHeight={16}
    >
      {value}
    </Text>
  )
}

export default ob(Comments)
