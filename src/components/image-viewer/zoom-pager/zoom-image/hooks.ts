/*
 * @Author: czy0729
 * @Date: 2026-08-19 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-20 04:08:50
 */
import { useEffect, useMemo, useRef } from 'react'
import { PanResponder } from 'react-native'
import {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { clamp, getHorizontalMax, getVerticalMax } from '../utils'
import {
  CLICK_DISTANCE,
  DOUBLE_CLICK_INTERVAL,
  DOUBLE_TAP_DURATION,
  LONG_PRESS_TIME,
  MAX_SCALE,
  MIN_SCALE,
  NOOP,
  SETTLE_DURATION,
  SWIPE_DOWN_THRESHOLD
} from './ds'

import type { GestureResponderEvent, PanResponderGestureState, ViewStyle } from 'react-native'
import type { UseZoomImageOptions } from './types'

/** 两指间距 */
const getDistance = (x1: number, y1: number, x2: number, y2: number): number =>
  Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)

/**
 * 手势图片引擎: 内联重写 react-native-image-pan-zoom
 *
 * 用 PanResponder (JS 线程) + reanimated shared values 复刻原 PanResponder 数学:
 * - 单指拖动: 有界拖拽 + 横向溢出给父级跟随翻页, 图片低于视口时下滑关闭 (下拉缩小)
 * - 双指捏合: 围绕两指中心缩放
 * - 双击: 缩放 1 <-> 2 切换
 * - 长按: 定时器触发
 *
 * 全部手势处理在 JS 线程, shared value 仅从 JS 写入, 规避原生手势与跨线程动画崩溃
 */
export const useZoomImage = ({
  cropWidth,
  cropHeight,
  imageWidth,
  imageHeight,
  imageIndex = 0,
  panToMove = true,
  pinchToZoom = true,
  enableDoubleClickZoom = true,
  clickDistance = CLICK_DISTANCE,
  maxOverflow = 100,
  longPressTime = LONG_PRESS_TIME,
  doubleClickInterval = DOUBLE_CLICK_INTERVAL,
  swipeDownThreshold = SWIPE_DOWN_THRESHOLD,
  enableSwipeDown = false,
  enableCenterFocus = true,
  minScale = MIN_SCALE,
  maxScale = MAX_SCALE,
  onClick = NOOP,
  onDoubleClick = NOOP,
  onLongPress = NOOP,
  horizontalOuterRangeOffset = NOOP,
  responderRelease = NOOP,
  onMove = NOOP,
  onSwipeDown = NOOP
}: UseZoomImageOptions) => {
  // 渲染值: 缩放 (可能被 withTiming 动画中)
  const scale = useSharedValue(1)

  // 逻辑值: 瞬间更新的缩放, 供边界计算使用 (镜像原版的 this.scale)
  const logicScale = useSharedValue(1)

  // 位移 (content 单位, 渲染 transform 与手势更新一致)
  const positionX = useSharedValue(0)
  const positionY = useSharedValue(0)

  // 手势过程量 (仅 JS 线程读写)
  const horizontalWholeOuterCounter = useSharedValue(0)
  const swipeDownOffset = useSharedValue(0)
  const isHorizontalWrap = useSharedValue(false)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: positionX.value },
      { translateY: positionY.value }
    ] as ViewStyle['transform']
  }))

  // 每次渲染都最新, panResponder 只创建一次, 避免手势中途重建
  const paramsRef = useRef({
    cropWidth,
    cropHeight,
    imageWidth,
    imageHeight,
    imageIndex,
    panToMove,
    pinchToZoom,
    enableDoubleClickZoom,
    enableSwipeDown,
    enableCenterFocus,
    clickDistance,
    maxOverflow,
    longPressTime,
    doubleClickInterval,
    swipeDownThreshold,
    minScale,
    maxScale,
    onClick,
    onDoubleClick,
    onLongPress,
    horizontalOuterRangeOffset,
    responderRelease,
    onMove,
    onSwipeDown
  })
  paramsRef.current = {
    cropWidth,
    cropHeight,
    imageWidth,
    imageHeight,
    imageIndex,
    panToMove,
    pinchToZoom,
    enableDoubleClickZoom,
    enableSwipeDown,
    enableCenterFocus,
    clickDistance,
    maxOverflow,
    longPressTime,
    doubleClickInterval,
    swipeDownThreshold,
    minScale,
    maxScale,
    onClick,
    onDoubleClick,
    onLongPress,
    horizontalOuterRangeOffset,
    responderRelease,
    onMove,
    onSwipeDown
  }

  // 手势瞬时状态 (JS refs)
  const lastTranslationX = useRef(0)
  const lastTranslationY = useRef(0)
  const lastReportedOverflow = useRef(0)
  const isPinching = useRef(false)
  const savedFocalX = useRef(0)
  const savedFocalY = useRef(0)
  const pinchStartDistance = useRef(1)
  const pinchStartScale = useRef(1)
  const grantTime = useRef(0)
  const lastTapTime = useRef(0)
  const longPressFired = useRef(false)
  const gestureActive = useRef(false)
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const singleClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  const clearSingleClick = () => {
    if (singleClickTimer.current) {
      clearTimeout(singleClickTimer.current)
      singleClickTimer.current = null
    }
  }

  useEffect(
    () => () => {
      clearLongPress()
      clearSingleClick()
    },
    []
  )

  const notifyMove = (type: string) => {
    const { onMove } = paramsRef.current
    if (onMove === NOOP) return
    onMove({
      type,
      positionX: positionX.value,
      positionY: positionY.value,
      scale: logicScale.value,
      zoomCurrentDistance: 0
    })
  }

  /** 横向溢出上报去重: 值未变化时跳过 */
  const reportHorizontalOverflow = (value: number) => {
    if (lastReportedOverflow.current === value) return
    lastReportedOverflow.current = value
    paramsRef.current.horizontalOuterRangeOffset(value)
  }

  /** 横向溢出跟踪: 返回修正后的 diffX */
  const adjustHorizontalOverflow = (diffX: number): number => {
    const counter = horizontalWholeOuterCounter.value

    if (counter > 0) {
      // 溢出在右侧
      if (diffX < 0) {
        if (counter > Math.abs(diffX)) {
          // 偏移量还没用完
          horizontalWholeOuterCounter.value += diffX
        } else {
          // 收回全部偏移量, 剩余位移参与拖拽
          const next = diffX + horizontalWholeOuterCounter.value
          horizontalWholeOuterCounter.value = 0
          reportHorizontalOverflow(0)
          return next
        }
      } else {
        horizontalWholeOuterCounter.value += diffX
      }
    } else if (counter < 0) {
      // 溢出在左侧
      if (diffX > 0) {
        if (Math.abs(counter) > diffX) {
          horizontalWholeOuterCounter.value += diffX
        } else {
          const next = diffX + horizontalWholeOuterCounter.value
          horizontalWholeOuterCounter.value = 0
          reportHorizontalOverflow(0)
          return next
        }
      } else {
        horizontalWholeOuterCounter.value += diffX
      }
    }

    return diffX
  }

  /** 手势结束回位: 钳制边界 / 缩回 1 / 归零 */
  const settle = () => {
    const { imageWidth, imageHeight, cropWidth, cropHeight, enableCenterFocus } = paramsRef.current

    if (enableCenterFocus && logicScale.value < 1) {
      logicScale.value = 1
      scale.value = withTiming(1, { duration: SETTLE_DURATION })
      positionX.value = withTiming(0, { duration: SETTLE_DURATION })
      positionY.value = withTiming(0, { duration: SETTLE_DURATION })
    } else if (enableCenterFocus && logicScale.value === 1) {
      positionX.value = withTiming(0, { duration: SETTLE_DURATION })
      positionY.value = withTiming(0, { duration: SETTLE_DURATION })
    } else {
      if (imageWidth * logicScale.value <= cropWidth) {
        // 图片窄于盒子时水平居中 (缩放以中心为原点, 位移 0 即居中)
        positionX.value = withTiming(0, { duration: SETTLE_DURATION })
      } else {
        const horizontalMax = getHorizontalMax(imageWidth, logicScale.value, cropWidth)
        positionX.value = withTiming(clamp(positionX.value, -horizontalMax, horizontalMax), {
          duration: SETTLE_DURATION
        })
      }

      if (imageHeight * logicScale.value <= cropHeight) {
        // 图片矮于盒子时垂直居中
        positionY.value = withTiming(0, { duration: SETTLE_DURATION })
      } else {
        const verticalMax = getVerticalMax(imageHeight, logicScale.value, cropHeight)
        positionY.value = withTiming(clamp(positionY.value, -verticalMax, verticalMax), {
          duration: SETTLE_DURATION
        })
      }
    }

    horizontalWholeOuterCounter.value = 0
    swipeDownOffset.value = 0
  }

  /** 双击缩放: 1 <-> 2 切换 (放大后居中显示) */
  const toggleZoomByDoubleTap = () => {
    if (logicScale.value > 1 || logicScale.value < 1) {
      // 已放大, 回归原位
      logicScale.value = 1
      scale.value = withTiming(1, { duration: DOUBLE_TAP_DURATION })
      positionX.value = withTiming(0, { duration: DOUBLE_TAP_DURATION })
      positionY.value = withTiming(0, { duration: DOUBLE_TAP_DURATION })
    } else {
      // 放大到 2 倍并居中 (transform 缩放以视图中心为原点, 位移 0 即居中)
      logicScale.value = 2
      scale.value = withTiming(2, { duration: DOUBLE_TAP_DURATION })
      positionX.value = withTiming(0, { duration: DOUBLE_TAP_DURATION })
      positionY.value = withTiming(0, { duration: DOUBLE_TAP_DURATION })
    }
  }

  const handleGrant = (e: GestureResponderEvent) => {
    const { clickDistance, longPressTime, onLongPress, imageIndex } = paramsRef.current

    grantTime.current = Date.now()
    gestureActive.current = true
    isPinching.current = false
    longPressFired.current = false
    lastTranslationX.current = 0
    lastTranslationY.current = 0
    lastReportedOverflow.current = 0
    horizontalWholeOuterCounter.value = 0
    swipeDownOffset.value = 0
    isHorizontalWrap.value = false

    // 单指按住时长达到阈值视为长按
    clearLongPress()

    // 取消可能仍在运行的动画, 避免与本次手势的写入互相覆盖 (缩放/回位动画结束时立刻再次捏合)
    cancelAnimation(scale)
    cancelAnimation(positionX)
    cancelAnimation(positionY)

    // 先把坐标抽成原始值, 定时器回调不依赖事件对象 (事件可能被系统置空)
    const pressEvent = {
      locationX: e.nativeEvent.locationX,
      locationY: e.nativeEvent.locationY,
      pageX: e.nativeEvent.pageX,
      pageY: e.nativeEvent.pageY,
      imageIndex
    }

    longPressTimer.current = setTimeout(() => {
      longPressTimer.current = null
      // 手势已结束 (松手/被抢占) 则不再触发
      if (!gestureActive.current) return
      longPressFired.current = true
      onLongPress(pressEvent)
    }, longPressTime)

    if (e.nativeEvent.touches.length >= 2) clearLongPress()
    if (clickDistance < 0) return
    notifyMove('onPanResponderGrant')
  }

  const handleMove = (e: GestureResponderEvent, g: PanResponderGestureState) => {
    const {
      imageWidth,
      imageHeight,
      cropWidth,
      cropHeight,
      panToMove,
      pinchToZoom,
      clickDistance,
      maxOverflow,
      enableSwipeDown
    } = paramsRef.current

    const touches = e.nativeEvent.touches
    // 用 gestureState.dx/dy 的累计位移差 (系统跟踪, 事件 pageX 在某些平台会滞后导致无位移)
    const lastX = lastTranslationX.current
    const lastY = lastTranslationY.current
    lastTranslationX.current = g.dx
    lastTranslationY.current = g.dy
    const diffX = g.dx - lastX
    const diffY = g.dy - lastY

    // 移动超阈值或双指, 取消长按
    if (Math.abs(diffX) > clickDistance || Math.abs(diffY) > clickDistance || touches.length >= 2) {
      clearLongPress()
    }

    if (touches.length >= 2 && pinchToZoom) {
      // 双指捏合: 围绕两指中心缩放 (用 pageX/pageY, 不受缩放 transform 影响)
      const p1 = touches[0]
      const p2 = touches[1]

      if (!isPinching.current) {
        isPinching.current = true
        pinchStartDistance.current = getDistance(p1.pageX, p1.pageY, p2.pageX, p2.pageY) || 1
        pinchStartScale.current = logicScale.value
        savedFocalX.current = (p1.pageX + p2.pageX) / 2
        savedFocalY.current = (p1.pageY + p2.pageY) / 2
      }

      const distance = getDistance(p1.pageX, p1.pageY, p2.pageX, p2.pageY) || 1
      const zoom = clamp(
        pinchStartScale.current * (distance / pinchStartDistance.current),
        paramsRef.current.minScale,
        paramsRef.current.maxScale
      )
      const beforeScale = logicScale.value

      logicScale.value = zoom
      scale.value = zoom

      // 图片慢慢往两指中心点移动
      const diffScale = zoom - beforeScale
      positionX.value -= ((savedFocalX.current - cropWidth / 2) * diffScale) / zoom
      positionY.value -= ((savedFocalY.current - cropHeight / 2) * diffScale) / zoom

      notifyMove('onPanResponderMove')
      return
    }

    // 捏合刚结束的过渡帧不参与拖动
    if (isPinching.current) return

    if (panToMove) {
      // 横向主导即视为横向手势: 重置下滑状态, 避免起始轻微纵向位移把横向跟随锁死
      if (Math.abs(diffX) > Math.abs(diffY)) {
        isHorizontalWrap.value = true
        if (swipeDownOffset.value !== 0) {
          swipeDownOffset.value = 0
        }
      }

      if (swipeDownOffset.value === 0) {
        if (imageWidth * logicScale.value > cropWidth) {
          // 图片宽于盒子, 有界拖拽 + 边缘溢出跟踪 (顶到边缘继续外拖可带动页面翻页)
          const horizontalMax = getHorizontalMax(imageWidth, logicScale.value, cropWidth)
          const atLeftEdge = positionX.value <= -horizontalMax
          const atRightEdge = positionX.value >= horizontalMax
          const goingOutward = (atLeftEdge && diffX < 0) || (atRightEdge && diffX > 0)

          if (goingOutward) {
            // 已顶到边缘继续外拖: 位移直接算作页面溢出
            horizontalWholeOuterCounter.value += diffX
          } else {
            // 图片内拖拽或往回拖: 先消耗已有页面偏移, 再移动图片
            const correctedX = adjustHorizontalOverflow(diffX)
            const nextX = positionX.value + correctedX / logicScale.value
            const clampedX = clamp(nextX, -horizontalMax, horizontalMax)
            positionX.value = clampedX
            if (clampedX !== nextX) {
              // 本帧越过边缘: 超出部分换算回屏幕坐标计入页面溢出
              horizontalWholeOuterCounter.value += (nextX - clampedX) * logicScale.value
            }
          }
        } else {
          // 图片不宽于盒子, 位移全部算作溢出
          horizontalWholeOuterCounter.value += diffX
        }

        // 溢出量不超过设定界限
        if (horizontalWholeOuterCounter.value > maxOverflow) {
          horizontalWholeOuterCounter.value = maxOverflow
        } else if (horizontalWholeOuterCounter.value < -maxOverflow) {
          horizontalWholeOuterCounter.value = -maxOverflow
        }

        if (horizontalWholeOuterCounter.value !== 0) {
          reportHorizontalOverflow(horizontalWholeOuterCounter.value)
        }
      }

      if (imageHeight * logicScale.value > cropHeight) {
        // 图片高于盒子, 纵向弹性拖拽
        positionY.value += diffY / logicScale.value
      } else if (enableSwipeDown && !isHorizontalWrap.value) {
        // 图片不高于盒子, 下滑关闭 (不允许已有横向偏移时触发)
        swipeDownOffset.value += diffY
        if (swipeDownOffset.value > 0) {
          positionY.value += diffY / logicScale.value
          // 越到下方, 缩放越小
          logicScale.value -= diffY / 1000
          scale.value = logicScale.value
        }
      }
    }

    notifyMove('onPanResponderMove')
  }

  const handleRelease = (e: GestureResponderEvent, g: PanResponderGestureState) => {
    const {
      enableSwipeDown,
      swipeDownThreshold,
      clickDistance,
      longPressTime,
      doubleClickInterval,
      enableDoubleClickZoom,
      imageIndex,
      onDoubleClick,
      onClick,
      responderRelease
    } = paramsRef.current

    clearLongPress()
    const wasPinching = isPinching.current
    isPinching.current = false
    gestureActive.current = false
    isHorizontalWrap.value = false

    if (enableSwipeDown && swipeDownThreshold && swipeDownOffset.value > swipeDownThreshold) {
      paramsRef.current.onSwipeDown()
      return
    }

    // 捏合不触发翻页 (惯性速度会误判), 缩放回位交给 settle
    if (!wasPinching) {
      responderRelease(g.vx, logicScale.value)
    }
    settle()

    // 单击 / 双击 / 长按判定
    const now = Date.now()
    const moved = Math.abs(g.dx) > clickDistance || Math.abs(g.dy) > clickDistance
    const duration = now - grantTime.current

    if (!moved && !wasPinching && !longPressFired.current && duration < longPressTime) {
      const event = {
        locationX: e.nativeEvent.locationX,
        locationY: e.nativeEvent.locationY,
        pageX: e.nativeEvent.pageX,
        pageY: e.nativeEvent.pageY,
        imageIndex
      }

      if (
        enableDoubleClickZoom &&
        lastTapTime.current &&
        now - lastTapTime.current < doubleClickInterval
      ) {
        // 双击
        lastTapTime.current = 0
        clearSingleClick()
        onDoubleClick(event)
        toggleZoomByDoubleTap()
      } else {
        // 单击 (延迟判定, 等待可能的第二次点击)
        lastTapTime.current = now
        clearSingleClick()
        singleClickTimer.current = setTimeout(
          () => {
            singleClickTimer.current = null
            onClick(event)
          },
          enableDoubleClickZoom ? doubleClickInterval : 0
        )
      }
    }
  }

  const handleTerminate = () => {
    clearLongPress()
    clearSingleClick()
    isPinching.current = false
    gestureActive.current = false
    isHorizontalWrap.value = false
    settle()
  }

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 0 || Math.abs(g.dy) > 0,
        onPanResponderGrant: handleGrant,
        onPanResponderMove: handleMove,
        onPanResponderRelease: handleRelease,
        onPanResponderTerminationRequest: () => false,
        onPanResponderTerminate: handleTerminate
      }),
    // 全部通过 paramsRef / refs 访问, 只创建一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return { panHandlers: panResponder.panHandlers, animatedStyle }
}
