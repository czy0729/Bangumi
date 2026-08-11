/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import React from 'react'
import { ActivityIndicator as RNActivityIndicator, Text, View } from 'react-native'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as ActivityIndicatorProps } from './types'
export type { ActivityIndicatorProps }

/**
 * 加载指示器, 支持 toast 居中遮罩与行内 spinner 两种模式
 */
function ActivityIndicator({
  animating = true,
  color = 'gray',
  size = 'small',
  toast = false,
  text,
  style
}: ActivityIndicatorProps) {
  r(COMPONENT)

  if (!animating) return null

  const styles = memoStyles()

  if (toast) {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.innerContainer}>
          <View style={styles.wrapper}>
            <RNActivityIndicator color={color} size='large' />
            {!!text && <Text style={styles.toast}>{text}</Text>}
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.spinner, style]}>
      <RNActivityIndicator color={color} size={size} />
      {!!text && <Text style={styles.tip}>{text}</Text>}
    </View>
  )
}

export default observer(ActivityIndicator)