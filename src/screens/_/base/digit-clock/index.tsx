/*
 * @Author: czy0729
 * @Date: 2026-05-26 19:18:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-27 00:14:18
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { LinearGradient } from 'expo-linear-gradient'
import { Flex, Text } from '@components'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as DigitClockProps } from './types'
export type { DigitClockProps }

/** 数字时钟样式显示时长 */
export const DigitClock = observer(
  ({ label, value, hideDecimal = true, style }: DigitClockProps) => {
    r(COMPONENT)

    if (!value) return null

    const styles = memoStyles()

    // 数字部分长度小于2时保留小数，否则去掉小数
    const digitPart = value.replace('h', '').split('.')[0]
    const shouldHideDecimal = hideDecimal && digitPart.length >= 2

    let displayValue = shouldHideDecimal ? value.replace(/\.\d+h/, 'h') : value
    if (displayValue === '0h') displayValue = '-h'

    return (
      <Flex style={style}>
        {!!label && <Text lineHeight={22}>{label}：</Text>}
        <Flex style={styles.container}>
          {displayValue.split('').map((char, i) => (
            <Flex
              key={i}
              style={stl(styles.digitBox, char === '.' && styles.digitDot)}
              justify='center'
            >
              <LinearGradient
                style={styles.digitGradient}
                colors={[
                  'rgba(255,255,255,0.08)',
                  'rgba(255,255,255,0.02)',
                  'rgba(0,0,0,0.02)',
                  'rgba(0,0,0,0.2)'
                ]}
                locations={[0, 0.47, 0.53, 1]}
              />
              <View style={styles.digitLineShadowTop} />
              <View style={styles.digitLine} />
              <View style={styles.digitLineShadowBottom} />
              <Text type='__plain__' size={12} bold shadow>
                {char}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    )
  }
)

export default DigitClock
