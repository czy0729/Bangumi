/*
 * @Author: czy0729
 * @Date: 2024-03-29 04:26:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 03:44:17
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { stl } from '@utils'
import { styles } from './styles'

function Time({ time, prevTime, expand }) {
  return (
    <View style={stl(styles.time, prevTime && prevTime === time && styles.transparent)}>
      {!!(time && !(time === '2359' && !expand)) && (
        <Text bold>{time === '2359' ? '未知' : `${time.slice(0, 2)}:${time.slice(2)}`}</Text>
      )}
    </View>
  )
}

export default observer(Time)
