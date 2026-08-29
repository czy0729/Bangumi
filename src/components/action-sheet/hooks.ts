/*
 * @Author: czy0729
 * @Date: 2026-08-12 06:40:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-30 00:00:00
 */
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { NavigationContext } from '@react-navigation/native'
import { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { _ } from '@stores'
import { scheduleOnRN } from '@utils'
import { useBackHandler } from '@utils/hooks'

/** 动画时长 (ms) */
const DURATION = 240

/** 动作面板显示/收起动画状态 */
export const useActionSheet = (show: boolean, onClose?: () => void, height = 480) => {
  const progress = useSharedValue(show ? 1 : 0)
  const [showValue, setShow] = useState(show)
  const closingRef = useRef(false)

  const navigation = useContext(NavigationContext)

  const calcHeight = Math.min(
    Math.floor(height * _.device(1, 1.4)) || Math.floor(_.window.height * 0.5),
    Math.floor(_.window.height * _.web(0.92, 0.88))
  )

  const animateTo = useCallback((toValue: number, callback?: () => void) => {
    progress.value = withTiming(
      toValue,
      {
        duration: DURATION
      },
      finished => {
        if (finished && callback) scheduleOnRN(callback)
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleShow = useCallback(() => {
    if (showValue) return

    // 强制归零后再挂载: 收起时 UI 线程的归零动画可能被丢弃而残留 1,
    // 残留会让面板以展开态挂载且 withTiming(1) 从 1 到 1 无动画
    progress.value = 0
    setShow(true)
    requestAnimationFrame(() => animateTo(1))
  }, [animateTo, progress, showValue])

  const handleClose = useCallback(() => {
    if (!showValue || closingRef.current) return

    closingRef.current = true
    animateTo(0, () => {
      setShow(false)
      closingRef.current = false
      onClose?.()
    })
  }, [animateTo, onClose, showValue])

  useEffect(() => {
    if (show) {
      handleShow()
      return
    }

    handleClose()
  }, [show, handleShow, handleClose])

  useBackHandler(() => {
    // Android 的 hardwareBackPress 是全局广播, 被覆盖屏也会收到,
    // 只在所属 screen 聚焦时响应, 避免在新页面按返回时误关本页面板
    if (!showValue || !navigation?.isFocused()) return false

    // 收起动画进行中不吞返回键, 放行让页面正常返回
    if (closingRef.current) return false

    handleClose()
    return true
  })

  const contentStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(progress.value, [0, 1], [calcHeight, 0])
      }
    ]
  }))

  const maskStyle = useAnimatedStyle(() => ({
    opacity: progress.value
  }))

  return {
    /** 是否处于展示态 */
    showValue,

    /** 关闭并处理收起动画 */
    handleClose,

    /** 计算内容高度（用于进出场位移） */
    calcHeight,

    /** 内容容器进出场动画样式 */
    contentStyle,

    /** 遮罩进出场动画样式 */
    maskStyle
  }
}
