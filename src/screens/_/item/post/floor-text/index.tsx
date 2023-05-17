/*
 * @Author: czy0729
 * @Date: 2021-01-20 11:59:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-18 04:08:43
 */
import React from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { simpleTime } from '@utils'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function FloorText({ time, floor, directFloor }) {
  const styles = memoStyles()
  const type = directFloor ? _.select('main', 'warning') : 'sub'
  return (
    <Text
      style={!directFloor && styles.container}
      type={type}
      size={11}
      lineHeight={12}
      bold={directFloor}
    >
      {simpleTime(time)}
      {'   '}#{String(floor).replace('#', '')}
    </Text>
  )
}

export default ob(FloorText)
