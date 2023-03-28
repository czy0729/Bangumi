/*
 * @Author: czy0729
 * @Date: 2019-09-20 20:52:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 05:05:02
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { _ } from '@stores'
import { stl, toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { ColorValue } from '@types'
import { memoStyles } from './styles'
import { Props } from './types'

function Bar({ style, total = 0, level, next = 1 }: Props) {
  const styles = memoStyles()
  const percent = toFixed((total / next) * 100, 0)
  let backgroundColor: ColorValue
  switch (level) {
    case 0:
      backgroundColor = '#aaa'
      break
    case 1:
      backgroundColor = _.colorBid
      break
    case 2:
      backgroundColor = _.colorPrimary
      break
    case 3:
      backgroundColor = '#ffdc51'
      break
    case 4:
      backgroundColor = _.colorWarning
      break
    case 5:
      backgroundColor = _.colorMain
      break
    default:
      backgroundColor = _.colorAsk
      break
  }
  return (
    <View style={stl(styles.ico, style)}>
      <Text style={styles.iconText} type='tinygrailPlain' align='center'>
        lv.{level} {percent}%
      </Text>
      <View style={[styles.icoBar, styles.icoBarDark]}>
        <View
          style={[
            styles.icoProcess,
            {
              width: `${percent}%`,
              backgroundColor
            }
          ]}
        />
      </View>
    </View>
  )
}

export default ob(Bar)
