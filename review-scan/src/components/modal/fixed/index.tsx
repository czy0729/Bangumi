/*
 * @Author: czy0729
 * @Date: 2023-12-25 09:22:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-25 14:02:22
 */
import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated'
import { useObserver } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { Component } from '../../component'
import { Flex } from '../../flex'
import { Mask } from '../../mask'
import { ScrollView } from '../../scroll-view'
import { Text } from '../../text'
import { Props } from '../types'
import { styles } from './styles'

/** 不使用 Protal 的模态框 */
export const ModalFixed = ({
  style,
  visible,
  title,
  type = 'title',
  animated,
  onClose,
  children
}: Props) => {
  const activeRef = useSharedValue(visible ? 1 : 0)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(activeRef.value, {
        duration: 80
      })
    }
  })
  useEffect(() => {
    if (!animated) return

    setTimeout(() => {
      activeRef.value = visible ? 1 : 0
    }, 0)
  }, [activeRef, animated, visible])

  return useObserver(() => {
    if (!visible) return null

    return (
      <Component id='component-modal'>
        <Mask style={stl(styles.mask, animated && animatedStyle)} onPress={onClose} />
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
  })
}
