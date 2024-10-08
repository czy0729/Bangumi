/*
 * @Author: czy0729
 * @Date: 2021-01-20 11:59:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-07 07:20:18
 */
import React from 'react'
import { Text } from '@components'
import { simpleTime } from '@utils'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function FloorText({ time, floor }) {
  const styles = memoStyles()
  return (
    <Text style={styles.container} type='sub' size={11} lineHeight={12}>
      {simpleTime(time)}
      {'  '}#{String(floor).replace('#', '')}
    </Text>
  )
}

export default ob(FloorText)
