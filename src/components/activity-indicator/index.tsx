/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import React from 'react'
import { ActivityIndicator as RNActivityIndicator, View } from 'react-native'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { Text } from '../text'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as ActivityIndicatorProps } from './types'
export type { ActivityIndicatorProps }

/**
 * 加载指示器, 支持 toast 居中遮罩与行内 spinner 两种模式
 */
export const ActivityIndicator = observer(
  ({
    style,
    animating = true,
    color = 'gray',
    size = 'small',
    toast = false,
    text
  }: ActivityIndicatorProps) => {
    r(COMPONENT)

    if (!animating) return null

    if (toast) {
      return (
        <View style={stl(styles.container, style)}>
          <View style={styles.innerContainer}>
            <View style={styles.wrapper}>
              <RNActivityIndicator color={color} size='large' />
              {!!text && (
                <Text style={styles.text} type='__plain__'>
                  {text}
                </Text>
              )}
            </View>
          </View>
        </View>
      )
    }

    return (
      <View style={stl(styles.spinner, style)}>
        <RNActivityIndicator color={color} size={size} />
        {!!text && <Text style={styles.text}>{text}</Text>}
      </View>
    )
  }
)

export default ActivityIndicator
