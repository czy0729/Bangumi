/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:30:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-28 09:33:39
 */
import React from 'react'
import { Animated } from 'react-native'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { H_HEADER } from '../../../store'
import { styles } from './styles'

function Mask({ style }, { $ }: Ctx) {
  return (
    <Animated.View
      style={[
        styles.parallaxWrap,
        style,
        // eslint-disable-next-line react-native/no-inline-styles
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

export default obc(Mask)
