/*
 * @Author: czy0729
 * @Date: 2023-12-25 09:22:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 05:19:44
 */
import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { Component } from '../../component'
import { Flex } from '../../flex'
import { Mask, useMask } from '../../mask'
import { ScrollView } from '../../scroll-view'
import { Text } from '../../text'
import { memoStyles } from './styles'

import type { Props } from '../types'

/** 不使用 Protal 的模态框 */
export const ModalFixed = observer(
  ({ style, visible, title, type = 'title', animated, onClose, children }: Props) => {
    // 遮罩淡入淡出, 淡出结束后再卸载 (不传 animated 时保持旧版无动画行为)
    const { showValue } = useMask(animated ? visible : true)

    const activeRef = useSharedValue(visible ? 1 : 0)

    const animatedStyle = useAnimatedStyle(() => ({
      opacity: withTiming(activeRef.value, {
        duration: 80
      })
    }))

    useEffect(() => {
      if (!animated) return

      setTimeout(() => {
        activeRef.value = visible ? 1 : 0
      }, 0)
    }, [activeRef, animated, visible])

    if (animated ? !showValue : !visible) return null

    const styles = memoStyles()

    return (
      <Component id='component-modal'>
        <Mask style={styles.mask} show={animated ? visible : true} onPress={onClose} />
        <Flex style={styles.fixed} justify='center' pointerEvents='box-none'>
          <View style={styles.container} pointerEvents='auto'>
            <Animated.View style={stl(style, styles.modal, animated && animatedStyle)}>
              {!!title && (
                <Text style={_.mb.md} type={type} size={16}>
                  {title}
                </Text>
              )}
              <ScrollView>{children}</ScrollView>
            </Animated.View>
          </View>
        </Flex>
      </Component>
    )
  }
)
