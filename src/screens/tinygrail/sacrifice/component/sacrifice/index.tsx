/*
 * @Author: czy0729
 * @Date: 2019-09-20 22:05:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:18:03
 */
import React from 'react'
import { View } from 'react-native'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Amount from './amount'
import Check from './check'
import Head from './head'
import Slider from './slider'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Sacrifice() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  return (
    <View style={styles.container}>
      <Head />
      {$.state.showSacrifice && (
        <View style={_.mb.sm}>
          <Amount />
          <Check />
          <Slider />
        </View>
      )}
    </View>
  )
}

export default ob(Sacrifice, COMPONENT)
