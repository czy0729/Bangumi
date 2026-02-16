/*
 * @Author: czy0729
 * @Date: 2021-03-07 02:43:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:18:38
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Amount from './amount'
import Head from './head'
import RankPercents from './rank-percents'
import Slider from './slider'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Starforces() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  if ($.state.showStarForces) {
    return (
      <View
        style={[
          styles.container,
          {
            width: _.window.width
          }
        ]}
      >
        <Head />
        <View style={_.mb.sm}>
          <Amount />
          <RankPercents />
          <Slider />
        </View>
      </View>
    )
  }

  return (
    <Flex.Item style={styles.container}>
      <Head />
    </Flex.Item>
  )
}

export default ob(Starforces, COMPONENT)
