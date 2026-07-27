/*
 * @Author: czy0729
 * @Date: 2023-04-12 08:32:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 10:25:41
 */
import React from 'react'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { DOGE_CDN_IMG_DEFAULT, IOS } from '@constants'
import { IMAGE_FADE_DURATION } from '../ds'
import Image from '../image'

import type { ImageProps, ImageURISource } from 'react-native'
import type { Props } from './types'

const memo = new Map<string, boolean>()
memo.set(DOGE_CDN_IMG_DEFAULT, true)

function Remote({
  style,
  containerStyle,
  headers,
  uri,
  autoSize,
  autoHeight,
  fadeDuration,
  priority,
  onLoadEnd,
  ...other
}: Props) {
  const opacity = useSharedValue(fadeDuration === 0 ? 1 : 0)
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  const source = {
    headers: {
      ...headers,
      'Cache-Control': 'max-age=31536000'
    },
    uri,
    cache: (IOS ? 'force-cache' : 'immutable') as ImageURISource['cache'],
    ...(!IOS && priority ? { priority } : {})
  }
  const passProps = {
    ...other,
    style: style as ImageProps['style'],
    source,
    fadeDuration: 0,
    onLoadEnd
  }

  const skipAnimation = !systemStore.setting.imageFadeIn || memo.has(uri) || fadeDuration === 0
  if (skipAnimation) return <Image {...passProps} />

  const handleLoadEnd = () => {
    if (typeof onLoadEnd === 'function') onLoadEnd()

    opacity.value = withTiming(1, {
      duration: IMAGE_FADE_DURATION,
      easing: Easing.linear
    })

    setTimeout(() => {
      memo.set(uri, true)
    }, IMAGE_FADE_DURATION + 100)
  }

  return (
    <Animated.View
      style={stl(_.flatten(containerStyle)?.width === 'auto' && containerStyle, animatedStyle)}
    >
      <Image {...passProps} onLoadEnd={handleLoadEnd} />
    </Animated.View>
  )
}

export default observer(Remote)
