/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:43:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:14:10
 */
import React, { useMemo } from 'react'
import { Animated, View } from 'react-native'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { H_HEADER } from '../../../store'
import Head from '../../head'
import { memoStyles } from './styles'

import type { WithViewStyles } from '@types'
import type { Ctx } from '../../../types'

function Center({ style }: WithViewStyles) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()

    const { scrollY } = $
    const memoHeadStyle = useMemo(
      () => ({
        opacity: scrollY.interpolate({
          inputRange: [
            -_.parallaxImageHeight,
            0,
            _.parallaxImageHeight - H_HEADER,
            _.parallaxImageHeight
          ],
          outputRange: [1, 1, 0, 0]
        })
      }),
      [scrollY]
    )

    return (
      <Animated.View style={stl(styles.parallaxWrap, style)}>
        <Animated.View style={memoHeadStyle}>
          <Head style={styles.head} />
        </Animated.View>
        <View style={styles.parallaxLine} />
      </Animated.View>
    )
  })
}

export default Center
