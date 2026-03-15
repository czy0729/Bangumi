/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:43:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-14 17:22:37
 */
import React, { useMemo } from 'react'
import { Animated, View } from 'react-native'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { useInsets, useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import { IS_IOS_5_6_7_8 } from '@styles'
import { H_HEADER } from '../../../ds'
import Head from '../../head'
import Sensor from '../../sensor'
import { memoStyles } from './styles'

import type { WithViewStyles } from '@types'
import type { Ctx } from '../../../types'

function Center({ style }: WithViewStyles) {
  const { $ } = useStore<Ctx>()

  const { statusBarHeight } = useInsets()
  const memoHeaderStyle = useMemo(
    () =>
      ({
        right: {
          position: 'absolute',
          top: IOS ? statusBarHeight + (IS_IOS_5_6_7_8 ? 12 : 8) : statusBarHeight + 12,
          right: 8
        }
      } as const),
    [statusBarHeight]
  )

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
          <Sensor style={[memoHeaderStyle.right, styles.sensor]} />
        </Animated.View>
        <View style={styles.parallaxLine} />
      </Animated.View>
    )
  })
}

export default Center
