/*
 * @Author: czy0729
 * @Date: 2019-09-20 20:52:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 09:39:00
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { stl, toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { getLevelBackground } from '@tinygrail/_/utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Bar({ style, total = 0, level, next = 1 }: Props) {
  const styles = memoStyles()
  const percent = toFixed((total / next) * 100, 0)
  return (
    <View style={stl(styles.ico, style)}>
      <Text style={styles.iconText} type='tinygrailPlain' align='center' shadow>
        lv.{level} {percent}%
      </Text>
      <View style={[styles.icoBar, styles.icoBarDark]}>
        <View
          style={[
            styles.icoProcess,
            // @ts-expect-error
            {
              width: `${percent}%`,
              backgroundColor: getLevelBackground(level)
            }
          ]}
        />
      </View>
    </View>
  )
}

export default ob(Bar, COMPONENT)
