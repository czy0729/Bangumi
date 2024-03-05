/*
 * @Author: czy0729
 * @Date: 2023-04-12 08:32:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-02 01:10:29
 */
import React from 'react'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { useObserver } from 'mobx-react'
import { systemStore } from '@stores'
import { stl } from '@utils'
import { DOGE_CDN_IMG_DEFAULT, IOS } from '@constants'
import { AnyObject } from '@types'
import { IMAGE_FADE_DURATION } from '../ds'
import Image from '../image'

const lazyloadedMap = new Map<string, boolean>()
lazyloadedMap.set(DOGE_CDN_IMG_DEFAULT, true)

function Remote({
  style,
  containerStyle,
  headers,
  uri,
  autoSize,
  autoHeight,
  fadeDuration,
  onLoadEnd,
  ...other
}) {
  const activeRef = useSharedValue(fadeDuration === 0 ? 1 : 0)
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(activeRef.value, {
        duration: IMAGE_FADE_DURATION,
        easing: Easing.linear
      })
    }
  })

  return useObserver(() => {
    const source: AnyObject = {
      headers,

      // 安卓新版本不允许非 https 的图片了
      uri: uri.replace('http://', 'https://')
    }
    if (IOS) source.cache = 'force-cache'

    const passProps = {
      ...other,
      style,
      source,
      fadeDuration: 0,
      onLoadEnd
    }
    if (!systemStore.setting.imageFadeIn || lazyloadedMap.has(uri)) {
      return <Image {...passProps} />
    }

    return (
      <Animated.View style={stl(containerStyle?.width === 'auto' && containerStyle, animatedStyle)}>
        <Image
          {...passProps}
          onLoadEnd={() => {
            if (typeof onLoadEnd === 'function') onLoadEnd()

            setTimeout(() => {
              activeRef.value = 1
            }, 0)

            // 标记已观察过, 延迟是为了防止页面同时出现这个图片多次而后面的不执行逻辑
            setTimeout(() => {
              lazyloadedMap.set(uri, true)
            }, IMAGE_FADE_DURATION)
          }}
        />
      </Animated.View>
    )
  })
}

export default Remote
