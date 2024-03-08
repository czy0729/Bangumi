/*
 * @Author: czy0729
 * @Date: 2019-11-17 15:33:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-07 21:32:41
 */
import React from 'react'
import { View } from 'react-native'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Amount from './amount'
import Head from './head'
import Slider from './slider'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Auction(props, { $ }: Ctx) {
  const styles = memoStyles()
  return (
    <View style={styles.container}>
      <Head />
      {$.state.showAuction && (
        <>
          <Amount />
          <Slider />
        </>
      )}
    </View>
  )
}

export default obc(Auction, COMPONENT)
