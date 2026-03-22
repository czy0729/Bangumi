/*
 * @Author: czy0729
 * @Date: 2019-05-08 19:32:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:50:18
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _, useStore } from '@stores'
import { H_HEADER } from '../../ds'
import Menu from '../menu'
import { COMPONENT, Layers } from './ds'
import { styles } from './styles'

import type { ViewStyle } from '@types'
import type { Ctx } from '../../types'

function ParallaxImage() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { scrollY } = $
  const memoParallaxStyle = useMemo(() => {
    const h = _.parallaxImageHeight

    return {
      transform: [
        {
          translateY: scrollY.interpolate({
            inputRange: [-h, 0, h - H_HEADER, h],
            outputRange: [h / 2, 0, -(h - H_HEADER), -(h - H_HEADER)]
          })
        },
        {
          /**
           * -h: 2, 0: 1, h: 1 当 scrollY 在 -h 到 0 时, scale 按照 2-1 的动画运动
           * 当 scrollY 在 0-h 时, scale 不变. 可以输入任意数量对应的值, 但必须是递增或者相等
           */
          scale: scrollY.interpolate({
            inputRange: [-h, 0, h],
            outputRange: [2, 1, 1]
          })
        }
      ]
    } as ViewStyle
  }, [scrollY])

  return (
    <>
      <View style={styles.parallax} pointerEvents='box-none'>
        {Layers.map((Component, index) => (
          <Component key={index} style={memoParallaxStyle} />
        ))}
      </View>
      <Menu />
    </>
  )
}

export default observer(ParallaxImage)
