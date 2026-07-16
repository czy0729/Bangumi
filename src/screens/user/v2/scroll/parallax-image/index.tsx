/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-15 05:45:26
 */
import React, { useMemo } from 'react'
import { Animated, View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { Avatar } from '@_'
import { _, useStore } from '@stores'
import { HTMLDecode, stl } from '@utils'
import { useInsets } from '@utils/hooks'
import { IOS } from '@constants'
import BackgroundImage from '../../component/background-image'
import HeaderComponent from '../../component/header-component'
import Menu from '../../component/menu'
import Sensor from '../../component/sensor'
import { H_HEADER } from '../../ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function ParallaxImage({ scrollY, fixed }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { headerHeight } = useInsets()
  const topHeaderHeight = Math.max(H_HEADER, headerHeight)

  const styles = memoStyles()
  const { parallaxImageHeight } = _

  const { avatar, nickname } = $.usersInfo
  const src = $.avatar || avatar.large

  const memoParallaxStyle = useMemo(
    () =>
      ({
        transform: [
          {
            translateY: scrollY.interpolate({
              inputRange: [
                -parallaxImageHeight,
                0,
                parallaxImageHeight - topHeaderHeight,
                parallaxImageHeight
              ],
              outputRange: [
                parallaxImageHeight / 2,
                0,
                -(parallaxImageHeight - topHeaderHeight),
                -(parallaxImageHeight - topHeaderHeight)
              ]
            })
          },
          {
            // 安卓没有弹簧效果不需要形变
            scale: IOS
              ? scrollY.interpolate({
                  inputRange: [-parallaxImageHeight, 0, parallaxImageHeight],

                  // -h: 2, 0: 1, h: 1 当 scrollY 在 -h 到 0 时, scale 按照 2-1 的动画运动
                  // 当 scrollY 在 0-h 时, scale 不变. 可以输入任意数量对应的值, 但必须是递增或者相等
                  outputRange: [2, 1, 1]
                })
              : 1
          }
        ]
      } as const),
    [topHeaderHeight, parallaxImageHeight, scrollY]
  )

  const elHeader = useMemo(
    () => (
      <Flex style={styles.head} justify='center'>
        <HeaderComponent fixed={fixed} />
      </Flex>
    ),
    [fixed, styles]
  )

  const elBg = useMemo(
    () => (
      <>
        <Animated.View style={stl(styles.parallaxBg, memoParallaxStyle)} pointerEvents='none'>
          <BackgroundImage fixed={fixed} />
        </Animated.View>

        <Animated.View
          style={stl(styles.parallaxWrap, styles.parallaxMask, memoParallaxStyle, {
            opacity: scrollY.interpolate({
              inputRange: [
                -parallaxImageHeight,
                0,
                parallaxImageHeight - topHeaderHeight,
                parallaxImageHeight
              ],
              outputRange: _.select([0, 0.4, 1, 1], [0.4, 0.8, 1, 1])
            })
          })}
          pointerEvents='none'
        />

        <Animated.View
          style={stl(styles.parallaxMask, memoParallaxStyle, {
            opacity: scrollY.interpolate({
              inputRange: [
                -parallaxImageHeight,
                0,
                parallaxImageHeight - topHeaderHeight,
                parallaxImageHeight
              ],
              outputRange: [0, 0, 1, 1]
            })
          })}
          pointerEvents='none'
        >
          <Flex style={styles.title} justify='center'>
            <Avatar
              style={styles.avatar}
              size={28}
              src={src}
              borderWidth={0}
              placeholder={false}
              fallbackSrc={avatar.large}
            />
            <Text style={_.ml.sm} type='__plain__' align='center' bold shadow numberOfLines={1}>
              {HTMLDecode(nickname)}
            </Text>
          </Flex>
        </Animated.View>

        <Animated.View style={stl(styles.parallaxWrap, memoParallaxStyle)}>
          <Animated.View
            style={{
              opacity: scrollY.interpolate({
                inputRange: [
                  -parallaxImageHeight,
                  0,
                  parallaxImageHeight - topHeaderHeight,
                  parallaxImageHeight
                ],
                outputRange: [1, 1, 0, 0]
              })
            }}
          >
            {elHeader}
            <Sensor style={styles.sensor} />
          </Animated.View>

          <View style={styles.parallaxLine} />
        </Animated.View>
      </>
    ),
    [
      styles,
      memoParallaxStyle,
      fixed,
      scrollY,
      parallaxImageHeight,
      topHeaderHeight,
      src,
      avatar.large,
      nickname,
      elHeader
    ]
  )

  return (
    <>
      <View style={styles.parallax} pointerEvents={fixed ? 'none' : 'auto'}>
        {elBg}
      </View>
      <Menu />
    </>
  )
}

export default observer(ParallaxImage)
