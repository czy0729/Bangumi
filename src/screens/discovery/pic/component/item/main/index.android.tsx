/*
 * @Author: czy0729
 * @Date: 2025-06-18 03:19:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-15 12:00:00
 */
import { useCallback, useRef } from 'react'
import { Image as RNImage, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { Touchable } from '@components'
import { showAndroidPopMenu } from '@components/popover/android'
import { systemStore } from '@stores'
import { getURI } from '../../../utils'
import { FADE_DURATION, styles } from './styles'

import type { ViewInstance } from 'react-native'
import type { Props } from './types'

function Main({ width, height, data, image, onPress, onSelect, onError }: Props) {
  const viewRef = useRef<ViewInstance>(null)

  const opacity = useSharedValue(systemStore.setting.imageFadeIn ? 0 : 1)

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  const handleLongPress = useCallback(() => {
    // 与 Popover 共用自定义原生菜单入口, 简繁转换 / 降级 / 选中回传由入口统一处理
    showAndroidPopMenu({
      anchor: viewRef.current,
      data,
      onSelect: (_item, index) => {
        if (typeof index === 'number') onSelect(data[index])
      }
    })
  }, [data, onSelect])

  /** 图片加载完成后才出现 */
  const handleLoadEnd = useCallback(() => {
    opacity.value = withTiming(1, {
      duration: FADE_DURATION,
      easing: Easing.out(Easing.quad)
    })
  }, [opacity])

  const handleError = useCallback(() => {
    onError?.()
  }, [onError])

  return (
    <View>
      <View ref={viewRef} style={styles.overflowView} pointerEvents='none' />
      <Touchable
        style={[
          styles.image,
          {
            width,
            height
          }
        ]}
        onPress={onPress}
        onLongPress={handleLongPress}
        withoutFeedback
      >
        <Animated.View style={animatedStyle}>
          <RNImage
            style={{
              width,
              height
            }}
            source={{ uri: getURI(image) }}
            onLoadEnd={handleLoadEnd}
            onError={handleError}
          />
        </Animated.View>
      </Touchable>
    </View>
  )
}

export default observer(Main)
