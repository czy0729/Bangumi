/*
 * @Author: czy0729
 * @Date: 2026-11-16 10:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-16 10:20:00
 *
 * 提交按钮翻面: 提交成功后文案变为最新真实收藏状态, 翻面 + 震动
 * 动画模式与 eps/flip-button 一致 (240ms 延迟 → feedback → 480ms rotateX)
 * 只有 text 参与翻面触发, type / loading 同步作用于两层不进 diff
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { Button } from '@components'
import { _ } from '@stores'
import { feedback, getType, urlStringify } from '@utils'
import { IOS } from '@constants'

import type { FlipBtnProps } from './types'

const perspective = 2400
const config = {
  duration: 480,
  easing: Easing.inOut(Easing.ease)
}

/** 控制 feedback 只触发一次 */
let feedbacked = false

function FlipBtn({ style, disabled, flipLabel, onSubmit }: FlipBtnProps) {
  const height = _.device(44, 50)
  const activeRef = useSharedValue(0)
  const animatedRef = useRef(false)

  /** 翻面期间两层静止展示且不可点, 防止重复提交 */
  const flipping = !!flipLabel
  const text = flipLabel || '更新'

  const defaultProps = useMemo(
    () => ({
      text
    }),
    [text]
  )
  /** before 面定格在挂载时的文案, 复位靠弹窗重开时的 flipKey 重挂载 */
  const [beforeProps] = useState(defaultProps)
  const [afterProps, setAfterProps] = useState(defaultProps)

  /** 动画触发: 文案变化 → 震动并翻面 (每次挂载只翻一次, 弹窗重开由 flipKey 重挂载复位) */
  useEffect(() => {
    if (animatedRef.current || activeRef.value) return

    if (urlStringify(defaultProps) !== urlStringify(beforeProps)) {
      animatedRef.current = true
      setAfterProps(defaultProps)

      setTimeout(() => {
        if (!feedbacked) {
          feedback()
          feedbacked = true
          setTimeout(() => {
            feedbacked = false
          }, config.duration)
        }

        activeRef.value = 1
      }, 240)
    }
  }, [beforeProps, defaultProps, activeRef])

  const beforeStyleAnimated = useAnimatedStyle(() => {
    const rotate = IOS ? '0deg' : activeRef.value ? '90deg' : '0deg'

    return {
      opacity: withTiming(1 - activeRef.value, config),
      transform: [
        { perspective },
        { rotateX: withTiming(rotate, config) },
        { translateY: withTiming(-activeRef.value * height, config) }
      ]
    } as const
  })

  const afterStyleAnimated = useAnimatedStyle(() => {
    const rotate = IOS ? '0deg' : activeRef.value ? '0deg' : '90deg'

    return {
      opacity: withTiming(activeRef.value, config),
      transform: [
        { perspective },
        { rotateX: withTiming(rotate, config) },
        { translateY: withTiming(-activeRef.value * height, config) }
      ]
    } as const
  })

  /** 提交中浅灰 + 转圈; 翻面后的颜色与条目页 Box 按钮一致, 由收藏状态决定 (在看=primary / 看过=warning / 搁置=wait…) */
  const beforeType = !flipping && disabled ? 'wait' : 'main'
  const afterType = flipLabel ? getType(flipLabel, 'main') : beforeType
  const loading = !flipping && disabled
  const onPress = flipping || disabled ? undefined : onSubmit

  const containerStyle = {
    height: height * 2
  }
  const animatedViewStyle = { marginTop: -height }
  const placeholderStyle = { height }

  return (
    <>
      <View style={containerStyle}>
        {/* 门控跟随可见面: 翻面期间及翻面后 before 面已透明, 交互交还给 after 面 */}
        <Animated.View
          style={[animatedViewStyle, beforeStyleAnimated]}
          pointerEvents={flipping ? 'none' : 'auto'}
        >
          <View style={placeholderStyle} />
          <Button style={style} type={beforeType} loading={loading} onPress={onPress}>
            {beforeProps.text}
          </Button>
        </Animated.View>

        {/* 静止时 after 面在其下层占位, 不拦截触摸, 按压反馈落在可见的 before 面上 */}
        <Animated.View
          style={[animatedViewStyle, afterStyleAnimated]}
          pointerEvents={flipping ? 'auto' : 'none'}
        >
          <View style={placeholderStyle} />
          <Button style={style} type={afterType} loading={loading} onPress={onPress}>
            {afterProps.text}
          </Button>
        </Animated.View>
      </View>

      {/* 抵消双层容器多出的一层占位, 使整体高度与单颗按钮一致且静止位置不偏移 */}
      <View style={{ marginTop: -height }} />
    </>
  )
}

export default observer(FlipBtn)
