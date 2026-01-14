/*
 * @Author: czy0729
 * @Date: 2019-11-17 15:33:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 08:25:46
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Amount from './amount'
import Head from './head'
import Slider from './slider'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Auction() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    if ($.state.showAuction) {
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

export default Auction
