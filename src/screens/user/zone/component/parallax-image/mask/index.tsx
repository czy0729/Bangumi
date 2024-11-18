/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:30:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:14:26
 */
import React from 'react'
import { Animated } from 'react-native'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { H_HEADER } from '../../../store'
import { styles } from './styles'

function Mask({ style }) {
  const { $ } = useStore<Ctx>()
  return (
    <Animated.View
      style={[
        styles.parallaxWrap,
        style,
        {
          backgroundColor: 'rgba(0, 0, 0, 0.24)',
          opacity: $.scrollY.interpolate({
            inputRange: [
              -_.parallaxImageHeight,
              0,
              _.parallaxImageHeight - H_HEADER,
              _.parallaxImageHeight
            ],
            outputRange: _.select([0, 0.4, 1, 1], [0.4, 0.8, 1, 1])
          })
        }
      ]}
    />
  )
}

export default ob(Mask)
