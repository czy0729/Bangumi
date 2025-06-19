/*
 * @Author: czy0729
 * @Date: 2024-03-03 07:03:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-19 17:14:38
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { formatNumber, stl } from '@utils'
import { ob } from '@utils/decorators'
import { ColorValue } from '@types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Progress({ style, size = 'md', assets, sacrifices, refine = 0, star }: Props) {
  const styles = memoStyles()

  let barColor: ColorValue = _.colorSuccess
  let percent = 1
  if (assets === 0) {
    percent = 0.04
    barColor = _.colorDanger
  } else if (assets && sacrifices) {
    percent = Math.max(Math.min(assets / sacrifices, 1), 0.06)
    if (refine && assets + refine >= sacrifices) {
      barColor = _.colorPrimary
    } else if (assets >= sacrifices) {
      barColor = _.colorSuccess
    } else {
      if (sacrifices < 500 || assets < 250) {
        barColor = _.colorDisabled
      } else if (percent <= 0.3) {
        barColor = _.colorDanger
      } else if (percent <= 0.5) {
        barColor = _.colorWarning
      }
    }
  }

  let text = `${star ? '★ ' : ''}${formatNumber(assets, 0)}`
  if (size === 'md' || assets !== sacrifices) text += ` / ${formatNumber(sacrifices, 0)}`

  let textSize = 12
  if (size === 'sm') {
    textSize = 9
  } else if (size === 'xs') {
    textSize = 8
  }

  return (
    <View style={stl(styles.progress, size === 'xs' && styles.progressXs, style)}>
      <View
        style={[
          styles.bar,
          size === 'xs' && styles.barXs,
          {
            width: `${percent * 100}%`,
            backgroundColor: barColor
          }
        ]}
      />
      <Flex style={styles.text} justify='center'>
        <Text
          type='__plain__'
          size={textSize}
          lineHeight={1}
          bold
          align={percent > 0.5 ? 'center' : 'left'}
          numberOfLines={1}
          shadow
        >
          {text}
        </Text>
      </Flex>
    </View>
  )
}

export default ob(Progress, COMPONENT)
