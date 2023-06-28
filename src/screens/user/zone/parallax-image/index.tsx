/*
 * @Author: czy0729
 * @Date: 2019-05-08 19:32:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-28 10:06:27
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import { H_HEADER } from '../store'
import { Ctx } from '../types'
import Bg from './bg'
import Mask from './mask'
import Header from './header'
import Center from './center'
import Back from './back'
import Friend from './friend'
import Member from './member'
import Menu from './menu'
import { styles } from './styles'

function ParallaxImage(props, { $ }: Ctx) {
  const { fixed } = $.state

  const parallaxStyle: any = {
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
      }
    ]
  }

  // 安卓没有弹簧效果不需要形变
  if (IOS) {
    parallaxStyle.transform.push({
      scale: $.scrollY.interpolate({
        inputRange: [-_.parallaxImageHeight, 0, _.parallaxImageHeight],

        // -h: 2, 0: 1, h: 1 当 scrollY 在 -h 到 0 时, scale 按照 2-1 的动画运动
        // 当 scrollY 在 0-h 时, scale 不变. 可以输入任意数量对应的值, 但必须是递增或者相等
        outputRange: [2, 1, 1]
      })
    })
  }

  return (
    <>
      <View style={styles.parallax} pointerEvents={fixed ? 'none' : undefined}>
        <Bg style={parallaxStyle} />
        <Mask style={parallaxStyle} />
        <Header style={parallaxStyle} />
        <Center style={parallaxStyle} />
      </View>
      <Back />
      <Flex style={[_.header.right, styles.right]}>
        <Friend />
        <Member />
        <Menu />
      </Flex>
    </>
  )
}

export default obc(ParallaxImage)
