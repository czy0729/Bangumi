/*
 * @Author: czy0729
 * @Date: 2023-04-12 08:32:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-08 13:35:14
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated'
import { systemStore } from '@stores'
import { stl } from '@utils'
import { IOS } from '@constants'
import { AnyObject } from '@types'
import Image from '../image'

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
        duration: 640,
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
    if (!systemStore.setting.imageFadeIn) {
      return <Image {...passProps} />
    }

    return (
      <Animated.View
        style={stl(containerStyle?.width === 'auto' && containerStyle, animatedStyle)}
      >
        <Image
          {...passProps}
          onLoadEnd={() => {
            if (typeof onLoadEnd === 'function') onLoadEnd()
            activeRef.value = 1
          }}
        />
      </Animated.View>
    )
  })
}

export default Remote
