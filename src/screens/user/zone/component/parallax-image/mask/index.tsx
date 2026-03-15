/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:30:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-14 16:43:03
 */
import React, { useMemo } from 'react'
import { Animated } from 'react-native'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { H_HEADER } from '../../../ds'
import { styles } from './styles'

import type { WithViewStyles } from '@types'
import type { Ctx } from '../../../types'

function Mask({ style }: WithViewStyles) {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const { scrollY } = $
    const memoMaskStyle = useMemo(
      () => ({
        backgroundColor: 'rgba(0, 0, 0, 0.24)',
        opacity: scrollY.interpolate({
          inputRange: [
            -_.parallaxImageHeight,
            0,
            _.parallaxImageHeight - H_HEADER,
            _.parallaxImageHeight
          ],
          outputRange: _.select([0, 0.4, 1, 1], [0.4, 0.8, 1, 1])
        })
      }),
      [scrollY]
    )

    return <Animated.View style={stl(styles.parallaxWrap, style, memoMaskStyle)} />
  })
}

export default Mask
