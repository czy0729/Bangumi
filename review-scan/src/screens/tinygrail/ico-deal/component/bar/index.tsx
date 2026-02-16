/*
 * @Author: czy0729
 * @Date: 2019-09-20 20:52:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 09:39:00
 */
import React from 'react'
import { View } from 'react-native'
import { Iconfont, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { stl, toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { getLevelBackground } from '@tinygrail/_/utils'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function Bar({ style, total = 0, level, next = 1 }: Props) {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { step } = $.state
  const percent = toFixed((total / next) * 100, 0)
  const iconColor = _.select('rgba(0, 0, 0, 0.16)', 'rgba(255, 255, 255, 0.28)')
  return (
    <View style={stl(styles.ico, style)}>
      <Text style={styles.iconText} type='tinygrailPlain' align='center' bold shadow>
        lv.{level} · {percent}%
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
      {step > 0 && (
        <Touchable
          style={[styles.btn, styles.btnMinus]}
          onPress={() => {
            $.onStep(-1)
          }}
          onLongPress={() => {
            $.onStep(0)
          }}
        >
          <Iconfont name='md-navigate-before' size={20} color={iconColor} />
        </Touchable>
      )}
      <Touchable
        style={[styles.btn, styles.btnAdd]}
        onPress={() => {
          $.onStep(1)
        }}
      >
        <Iconfont name='md-navigate-next' size={20} color={iconColor} />
      </Touchable>
    </View>
  )
}

export default ob(Bar, COMPONENT)
