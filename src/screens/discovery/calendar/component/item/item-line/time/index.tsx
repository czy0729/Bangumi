/*
 * @Author: czy0729
 * @Date: 2024-03-29 04:26:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 17:10:00
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { stl } from '@utils'
import { formatTime } from '../../../../utils'
import { styles } from './styles'

import type { Props } from './types'

function Time({ time, prevTime, expand }: Props) {
  const text = time === '2359' ? (expand ? '未知' : '') : formatTime(time)

  return (
    <View style={stl(styles.time, prevTime && prevTime === time && styles.transparent)}>
      {!!text && <Text bold>{text}</Text>}
    </View>
  )
}

export default observer(Time)
