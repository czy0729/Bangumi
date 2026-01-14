/*
 * @Author: czy0729
 * @Date: 2019-09-20 22:05:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 08:15:18
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Amount from './amount'
import Check from './check'
import Head from './head'
import Slider from './slider'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Sacrifice() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    if ($.state.showSacrifice) {
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
            <Check />
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
  })
}

export default Sacrifice
