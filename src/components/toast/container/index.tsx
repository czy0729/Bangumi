/*
 * @Author: czy0729
 * @Date: 2020-09-28 18:30:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-12 07:42:33
 */
import React from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { syncThemeStore } from '@utils/async'
import { r } from '@utils/dev'
import { COMPONENT } from '../ds'
import BlurView from '../blur-view'
import Desc from '../desc'
import { useToastAnimation } from './hooks'
import { memoStyles } from './styles'

import type { Props } from '../types'

/**
 * Toast 单条提示容器, 淡入淡出 + loading 时显示关闭
 */
function Container({
  duration = 3,
  mask = true,
  onClose,
  onAnimationEnd,
  type = '',
  content
}: Props) {
  r(COMPONENT)

  const _ = syncThemeStore()
  const styles = memoStyles()

  const { showClose, animatedStyle } = useToastAnimation(duration, type, onClose, onAnimationEnd)

  let iconDom: React.ReactElement | null = null
  if (type === 'loading') {
    iconDom = (
      <ActivityIndicator style={styles.centering} animating color={_.isDark ? 'white' : 'gray'} />
    )
  }

  return (
    <View style={styles.container} pointerEvents={mask && !showClose ? undefined : 'box-none'}>
      <TouchableOpacity style={styles.innerContainer} activeOpacity={1} onPress={onAnimationEnd}>
        <Animated.View style={animatedStyle}>
          <BlurView style={[styles.innerWrap, iconDom ? styles.iconToast : styles.textToast]}>
            <View style={styles.body}>
              {iconDom}
              <Desc showClose={showClose}>{content}</Desc>
            </View>
          </BlurView>
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}

export default observer(Container)
