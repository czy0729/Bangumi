/*
 * @Author: czy0729
 * @Date: 2025-06-18 02:28:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-15 12:00:00
 */
import { useCallback, useMemo } from 'react'
import { Image as RNImage } from 'react-native'
import { observer } from 'mobx-react'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { Touchable } from '@components'
import { Popover } from '@_'
import { systemStore } from '@stores'
import { getURI } from '../../../utils'
import { FADE_DURATION, styles } from './styles'

import type { Props } from './types'

function Main({ width, height, data, image, onPress, onSelect, onError }: Props) {
  const opacity = useSharedValue(systemStore.setting.imageFadeIn ? 0 : 1)

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

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

  const elImage = useMemo(
    () => (
      <Touchable
        style={[
          styles.image,
          {
            width,
            height
          }
        ]}
        withoutFeedback
        onPress={onPress}
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
    ),
    [onPress, width, height, image, animatedStyle, handleLoadEnd, handleError]
  )

  return (
    <Popover data={data} activateOn='hold' onSelect={onSelect}>
      {elImage}
    </Popover>
  )
}

export default observer(Main)
