/*
 * @Author: czy0729
 * @Date: 2024-03-03 07:03:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 18:50:44
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { _ } from '@stores'
import { formatNumber, stl } from '@utils'
import { ob } from '@utils/decorators'
import { ColorValue, ViewStyle } from '@types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Progress({
  style,
  size = 'md',
  assets,
  sacrifices
}: {
  style?: ViewStyle
  size?: 'md' | 'sm'
  assets: number
  sacrifices: number
}) {
  const styles = memoStyles()
  const isMini = size === 'sm'

  let barColor: ColorValue = _.colorSuccess
  let percent = 1
  if (assets && sacrifices) {
    percent = Math.max(Math.min(assets / sacrifices, 1), 0.06)
    if (percent <= 0.25) {
      barColor = _.colorDanger
    } else if (percent <= 0.5) {
      barColor = _.colorWarning
    }
  }

  let text = formatNumber(assets, 0)
  if (!isMini || assets !== sacrifices) text += ` / ${formatNumber(sacrifices, 0)}`

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
        size={isMini ? 9 : 12}
        lineHeight={1}
        bold
        align={percent > 0.5 ? 'center' : 'left'}
        numberOfLines={1}
        shadow
      >
        {text}
      </Text>
    </View>
  )
}

export default ob(Progress, COMPONENT)
