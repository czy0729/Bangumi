/*
 * @Author: czy0729
 * @Date: 2026-08-12 06:40:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-12 06:40:00
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { scheduleOnRN } from '@utils'
import { _ } from '@stores'
import { useBackHandler } from '@utils/hooks'

/** 动画时长 (ms) */
const DURATION = 240

/** 动作面板显示/收起动画状态 */
export const useActionSheet = (show: boolean, onClose?: () => void, height = 480) => {
  const progress = useSharedValue(show ? 1 : 0)
  const [showValue, setShow] = useState(show)
  const closingRef = useRef(false)

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

    setShow(true)
    requestAnimationFrame(() => animateTo(1))
  }, [animateTo, showValue])

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
    if (!showValue) return false

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

  return { showValue, handleClose, calcHeight, contentStyle, maskStyle }
}
