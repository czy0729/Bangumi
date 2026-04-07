/*
 * @Author: czy0729
 * @Date: 2021-03-07 02:43:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 08:17:28
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { _, useStore } from '@stores'
import Amount from './amount'
import Head from './head'
import RankPercents from './rank-percents'
import Slider from './slider'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Starforces() {
  const { $ } = useStore<Ctx>(COMPONENT)

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

export default observer(Starforces)
