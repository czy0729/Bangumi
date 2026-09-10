/*
 * @Author: czy0729
 * @Date: 2026-08-09 05:55:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 13:00:00
 */
import { useCallback, useMemo } from 'react'
import { Gesture } from 'react-native-gesture-handler'
import { useSharedValue } from 'react-native-reanimated'
import { scheduleOnRN } from '@utils'
import { useHoldMenu } from '../context'
import { hapticFeedback, resolveHoverIndex } from '../utils'
import type { ItemGestureProps } from './types'

/** 手势触摸事件最小结构 */
type TouchEvent = { allTouches: { absoluteX: number; absoluteY: number }[] }

/** 激活前手指移动超出该距离即取消长按, 复刻原生默认 maxDist=10 的行为 */
const PRE_ACTIVATE_MAX_DIST = 10

/**
 * HoldItem 手势控制器
 * - 长按/点按/双击展开菜单, tap-hold 两者竞速共存 (短按走 tap, 按住 150ms 走长按)
 * - 长按展开后手指不松可直接拖到菜单上高亮, 移出菜单矩形自动取消高亮
 * - 抬手命中则选中该项, 未命中则收起菜单 (与 iOS context menu 一致)
 * - clone 上的点按关闭
 */
export const useItemGesture = ({
  activateOn,
  onStart,
  scaleBack,
  isAnimating,
  isActive,
  selectable,
  selectItem,
  close,
  closeOnTap
}: ItemGestureProps) => {
  const { active, position, highlight } = useHoldMenu()
  const { highlightIndex, scrollOffset, rowOffsets, contentHeight } = highlight

  // 长按起始位置, 用于激活前的移动取消判定
  const pressStart = useSharedValue({ x: 0, y: 0 })
  // 本次触摸长按是否真的激活过, 未激活的 onFinalize 不参与清理, 避免干扰 tap
  const isLongPressActive = useSharedValue(false)

  // 命中测试 (worklet): 返回手指下的菜单项索引, -1 为无
  const hitTest = useCallback(
    (absoluteX: number, absoluteY: number) => {
      'worklet'
      const pos = position.value
      if (!pos) return -1

      return resolveHoverIndex({
        absoluteX,
        absoluteY,
        menuLeft: pos.left,
        menuTop: pos.top + pos.tY,
        width: pos.width,
        height: pos.height,
        scrollOffset: scrollOffset.value,
        rowOffsets: rowOffsets.value,
        selectable,
        contentHeight: contentHeight.value
      })
    },
    [position, scrollOffset, rowOffsets, selectable, contentHeight]
  )

  // 高亮跟随手指切换 (worklet)
  const updateHover = useCallback(
    (absoluteX: number, absoluteY: number) => {
      'worklet'
      const index = hitTest(absoluteX, absoluteY)
      if (index !== highlightIndex.value) {
        highlightIndex.value = index
        if (index >= 0) {
          scheduleOnRN(hapticFeedback, 'Selection')
        }
      }
    },
    [hitTest, highlightIndex]
  )

  const onTouchesDown = useCallback(
    (event: TouchEvent) => {
      'worklet'
      const touch = event.allTouches[0]
      if (!touch) return
      pressStart.value = { x: touch.absoluteX, y: touch.absoluteY }
    },
    [pressStart]
  )

  // tap/double-tap 被拖动取消时, 中断缩放序列并清理已提交内容
  // 被长按接管时 isAnimating 已为 true, 不做清理
  const cancelBeforeOpen = useCallback(
    (_event: unknown, success: boolean) => {
      'worklet'
      if (!success && active.value !== 1 && !isAnimating.value) {
        isAnimating.value = false
        scaleBack()
        scheduleOnRN(close)
      }
    },
    [active, isAnimating, scaleBack, close]
  )

  // 触摸移动: 菜单已展开时做拖动高亮; 未展开时移动过远取消长按
  const onTouchesMove = useCallback(
    (event: TouchEvent, stateManager: { fail: () => void }) => {
      'worklet'
      const touch = event.allTouches[0]
      if (!touch) return

      if (active.value === 1) {
        // 长按展开后手指不松: 拖到菜单高亮, 移出菜单由 hitTest 自动取消
        if (isActive.value) {
          updateHover(touch.absoluteX, touch.absoluteY)
        }
        return
      }

      const dx = touch.absoluteX - pressStart.value.x
      const dy = touch.absoluteY - pressStart.value.y
      if (dx * dx + dy * dy > PRE_ACTIVATE_MAX_DIST * PRE_ACTIVATE_MAX_DIST) {
        stateManager.fail()
      }
    },
    [active, isActive, updateHover, pressStart]
  )

  const onLongPressStart = useCallback(() => {
    'worklet'
    isLongPressActive.value = true
    onStart()
  }, [isLongPressActive, onStart])

  // 长按抬手: 命中项则选中, 未命中则收起菜单
  const onLongPressFinalize = useCallback(
    (event: { absoluteX: number; absoluteY: number }) => {
      'worklet'
      // 短按由 tap 接管, 长按未激活过则直接退出
      if (!isLongPressActive.value) return
      isLongPressActive.value = false

      if (active.value !== 1 || !isActive.value) {
        // 未展开即结束: 清理已提交但未激活的菜单内容
        if (active.value !== 1) {
          isAnimating.value = false
          scaleBack()
          scheduleOnRN(close)
        }
        return
      }

      const index = highlightIndex.value
      highlightIndex.value = -1
      if (index >= 0) {
        scheduleOnRN(selectItem, index, event.absoluteX, event.absoluteY)
      } else {
        scheduleOnRN(close)
      }
    },
    [
      isLongPressActive,
      active,
      isActive,
      highlightIndex,
      selectItem,
      isAnimating,
      scaleBack,
      close
    ]
  )

  const gesture = useMemo(() => {
    const longPress = () =>
      Gesture.LongPress()
        .minDuration(150)
        // 允许手指远距离移动 (拖动选择需要), 激活前的取消由 onTouchesMove 判定
        .shouldCancelWhenOutside(false)
        .maxDistance(99999)
        .onStart(onLongPressStart)
        .onTouchesDown(onTouchesDown)
        .onTouchesMove(onTouchesMove)
        .onFinalize(onLongPressFinalize)

    const tap = (numberOfTaps: number) =>
      Gesture.Tap()
        .numberOfTaps(numberOfTaps)
        .onStart(onStart)
        .onFinalize(cancelBeforeOpen)

    if (activateOn === 'double-tap') return tap(2)
    if (activateOn === 'tap') return tap(1)
    // 点击与长按竞速共存: 短按抬起时 tap 激活, 按住 150ms 时长按激活
    if (activateOn === 'tap-hold') return Gesture.Race(longPress(), tap(1))

    return longPress()
  }, [
    activateOn,
    onStart,
    onLongPressStart,
    cancelBeforeOpen,
    onTouchesDown,
    onTouchesMove,
    onLongPressFinalize
  ])

  const overlayGesture = useMemo(
    () =>
      Gesture.Tap()
        .numberOfTaps(1)
        .onEnd(() => {
          'worklet'
          if (closeOnTap) {
            scheduleOnRN(close)
          }
        }),
    [closeOnTap, close]
  )

  return { gesture, overlayGesture }
}
