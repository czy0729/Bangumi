/*
 * @Author: czy0729
 * @Date: 2019-05-08 19:32:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:13:52
 */
import React from 'react'
import { View } from 'react-native'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { H_HEADER } from '../../store'
import Menu from '../menu'
import Bg from './bg'
import Center from './center'
import Header from './header'
import Mask from './mask'
import { COMPONENT } from './ds'
import { styles } from './styles'

function ParallaxImage() {
  const { $ } = useStore<Ctx>()
  const parallaxStyle = {
    transform: [
      {
        translateY: $.scrollY.interpolate({
          inputRange: [
            -_.parallaxImageHeight,
            0,
            _.parallaxImageHeight - H_HEADER,
            _.parallaxImageHeight
          ],
          outputRange: [
            _.parallaxImageHeight / 2,
            0,
            -(_.parallaxImageHeight - H_HEADER),
            -(_.parallaxImageHeight - H_HEADER)
          ]
        })
      },
      {
        scale: $.scrollY.interpolate({
          inputRange: [-_.parallaxImageHeight, 0, _.parallaxImageHeight],

          // -h: 2, 0: 1, h: 1 当 scrollY 在 -h 到 0 时, scale 按照 2-1 的动画运动
          // 当 scrollY 在 0-h 时, scale 不变. 可以输入任意数量对应的值, 但必须是递增或者相等
          outputRange: [2, 1, 1]
        })
      }
    ]
  }

  return (
    <>
      <View style={styles.parallax} pointerEvents='box-none'>
        <Bg style={parallaxStyle} />
        <Mask style={parallaxStyle} />
        <Header style={parallaxStyle} />
        <Center style={parallaxStyle} />
      </View>
      <Menu />
    </>
  )
}

export default ob(ParallaxImage, COMPONENT)
