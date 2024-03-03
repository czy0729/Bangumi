/*
 * @Author: czy0729
 * @Date: 2024-03-03 07:03:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-03 07:28:05
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { _ } from '@stores'
import { formatNumber, stl } from '@utils'
import { ob } from '@utils/decorators'
import { ColorValue, ViewStyle } from '@types'
import { memoStyles } from './styles'

function Progress({
  style,
  assets,
  sacrifices
}: {
  style?: ViewStyle
  assets: number
  sacrifices: number
}) {
  const styles = memoStyles()

  let barColor: ColorValue = _.colorSuccess
  let percent = 1
  if (assets && sacrifices) {
    percent = Math.min(assets / sacrifices, 1)
    if (percent <= 0.25) {
      barColor = _.colorDanger
    } else if (percent <= 0.5) {
      barColor = _.colorWarning
    }
  }

  return (
    <View style={stl(styles.progress, style)}>
      <View
        style={[
          styles.bar,
          {
            width: `${percent * 100}%`,
            backgroundColor: barColor
          }
        ]}
      />
      <Text
        style={styles.text}
        type='__plain__'
        size={12}
        lineHeight={1}
        bold
        align={percent > 0.5 ? 'center' : 'left'}
        shadow
      >
        {formatNumber(assets, 0)} / {formatNumber(sacrifices, 0)}
      </Text>
    </View>
  )
}

export default ob(Progress)
