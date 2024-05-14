/*
 * @Author: czy0729
 * @Date: 2021-03-07 02:43:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-07 18:38:13
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Amount from './amount'
import Head from './head'
import RankPercents from './rank-percents'
import Slider from './slider'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Starforces(props, { $ }: Ctx) {
  const styles = memoStyles()
  return (
    <View style={styles.container}>
      <Head />
      {$.state.showStarForces && (
        <View style={_.mb.sm}>
          <Amount />
          <RankPercents />
          <Slider />
        </View>
      )}
    </View>
  )
}

export default obc(Starforces, COMPONENT)
