/*
 * @Author: czy0729
 * @Date: 2023-11-06 06:27:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:03:24
 */
import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useObserver } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { Component } from '../component'
import { ScrollView } from '../scroll-view'
import { Text } from '../text'
import { COMPONENT } from './ds'
import { styles } from './styles.web'
import { Props as ModalProps } from './types'
import './index.scss'

export { ModalProps }

/** 通用模态框 */
export const Modal = ({
  style,
  visible,
  title,
  type = 'title',
  animated,
  onClose,
  children
}: ModalProps) => {
  r(COMPONENT)

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
        <Animated.View
          style={stl(styles.mask, animated && animatedStyle)}
          // @ts-ignore
          onClick={onClose}
        />
        <Animated.View style={stl(style, styles.modal, animated && animatedStyle)}>
          {!!title && (
            <Text style={_.mb.md} type={type} size={16}>
              {title}
            </Text>
          )}
          <ScrollView style={styles.body}>{children}</ScrollView>
        </Animated.View>
      </Component>
    )
  })
}

export const ModalFixed = Modal
