/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:43:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-28 09:46:25
 */
import React from 'react'
import { Animated, View } from 'react-native'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { H_HEADER } from '../../../store'
import Head from '../../head'
import { memoStyles } from './styles'

function Center({ style }, { $ }: Ctx) {
  const styles = memoStyles()
  return (
    <Animated.View style={[styles.parallaxWrap, style]}>
      <Animated.View
        style={{
          opacity: $.scrollY.interpolate({
            inputRange: [
              -_.parallaxImageHeight,
              0,
              _.parallaxImageHeight - H_HEADER,
              _.parallaxImageHeight
            ],
            outputRange: [1, 1, 0, 0]
          })
        }}
      >
        <Head style={styles.head} />
      </Animated.View>
      <View style={styles.parallaxLine} />
    </Animated.View>
  )
}

export default obc(Center)
