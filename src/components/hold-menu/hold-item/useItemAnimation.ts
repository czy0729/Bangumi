/*
 * @Author: czy0729
 * @Date: 2026-08-09 06:05:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-09 07:05:20
 */
import { useCallback, useRef } from 'react'
import {
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming
} from 'react-native-reanimated'
import { scheduleOnRN } from '@utils'
import {
  HOLD_ITEM_SCALE_DOWN_DURATION,
  HOLD_ITEM_SCALE_DOWN_VALUE,
  MENU_ANIMATION_DURATION,
  SPRING_CONFIGURATION
} from '../ds'
import { useHoldMenu } from '../context'
import { hapticFeedback } from '../utils'

import type { TransformArrayItem } from 'react-native-reanimated'
import type { View, ViewProps } from 'react-native'
import type { ItemAnimationProps } from './types'

/**
 * HoldItem 动画控制器: 按下缩放、item/clone 瞬时切换、位移弹簧、测量与展开
 * 仅读写 shared value, 不参与渲染, 消费端只取返回值
 * 所有 worklet 用 useCallback 保持稳定引用, 使手势 useMemo 的依赖长期稳定
 */
export const useItemAnimation = ({
  items,
  open,
  activateOn,
  hapticStyle,
  closeOnTap,
  bottom,
  menuAnchorPosition,
  actionParams,
  disableMove
}: ItemAnimationProps) => {
  const { active, position, activate } = useHoldMenu()

  // 本 item 是否展开过菜单, 仅展开的 item 显示 Portal clone
  const isActive = useSharedValue(false)
  // 是否已触发过展开, 用于避免首帧透明度动画造成闪动
  const wasActivated = useSharedValue(false)
  const isAnimating = useSharedValue(false)
  const itemRectX = useSharedValue(0)
  const itemRectY = useSharedValue(0)
  const itemRectWidth = useSharedValue(0)
  const itemRectHeight = useSharedValue(0)
  const itemScale = useSharedValue(1)
  const containerRef = useRef<View>(null)

  // 手势开始时提交菜单内容并计算位置, 使展开动画首帧即包含完整菜单项
  const prepare = useCallback(() => {
    if (!items.length) return

    const openMenu = (x: number, y: number, width: number, height: number) => {
      open({
        items,
        anchorX: x,
        anchorY: y,
        anchorWidth: width,
        anchorHeight: height,
        closeOnTap,
        bottom,
        menuAnchorPosition,
        actionParams,
        disableMove
      })
    }

    // 每次手势都重新测量, 位置必然新鲜; item 在滚动列表中可能已位移
    const node = containerRef.current
    if (!node) return

    node.measureInWindow((x, y, width, height) => {
      itemRectX.value = x
      itemRectY.value = y
      itemRectWidth.value = width
      itemRectHeight.value = height
      openMenu(x, y, width, height)
    })
  }, [
    items,
    open,
    closeOnTap,
    bottom,
    menuAnchorPosition,
    actionParams,
    disableMove,
    containerRef,
    itemRectX,
    itemRectY,
    itemRectWidth,
    itemRectHeight
  ])

  const scaleBack = useCallback(() => {
    'worklet'
    itemScale.value = withTiming(1, { duration: MENU_ANIMATION_DURATION / 2 })
  }, [itemScale])

  // 展开动画: 触发反馈后激活共享菜单, 与 clone 同步位移
  const activateMenu = useCallback(() => {
    if (hapticStyle !== 'None') hapticFeedback(hapticStyle || 'Medium')
    activate()
  }, [hapticStyle, activate])

  const onCompletion = useCallback(
    (finished?: boolean) => {
      'worklet'
      isAnimating.value = false
      if (!finished || !items.length) return

      isActive.value = true
      scaleBack()
      scheduleOnRN(activateMenu)
    },
    [isAnimating, items, isActive, scaleBack, activateMenu]
  )

  const scaleTap = useCallback(() => {
    'worklet'
    isAnimating.value = true
    // 与原版一致: 先缩小, 序列结束后(240ms)回弹并展开菜单
    itemScale.value = withSequence(
      withTiming(HOLD_ITEM_SCALE_DOWN_VALUE, {
        duration: HOLD_ITEM_SCALE_DOWN_DURATION
      }),
      withTiming(1, { duration: MENU_ANIMATION_DURATION / 2 }, onCompletion)
    )
  }, [isAnimating, itemScale, onCompletion])

  const scaleHold = useCallback(() => {
    'worklet'
    isAnimating.value = true
    // 与原版一致: 缩小结束后(180ms)立即展开菜单
    itemScale.value = withTiming(
      HOLD_ITEM_SCALE_DOWN_VALUE,
      { duration: HOLD_ITEM_SCALE_DOWN_DURATION },
      onCompletion
    )
  }, [isAnimating, itemScale, onCompletion])

  const onStart = useCallback(() => {
    'worklet'
    if (active.value === 1 || isAnimating.value) return
    wasActivated.value = true
    // 缩放动画期间在 JS 线程提交菜单内容与位置, 展开时可直接使用
    scheduleOnRN(prepare)

    if (activateOn === 'tap' || activateOn === 'double-tap') {
      scaleTap()
    } else {
      scaleHold()
    }
  }, [
    active,
    isAnimating,
    wasActivated,
    prepare,
    activateOn,
    scaleTap,
    scaleHold
  ])

  // 全局菜单关闭时复位本 item 的展开状态
  useAnimatedReaction(
    () => active.value,
    value => {
      if (value === 0) {
        isActive.value = false
      }
    }
  )

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      // 打开时瞬时切换, 关闭时等菜单收起后再切回, 避免两份内容重叠双绘造成闪动
      opacity: wasActivated.value
        ? isActive.value
          ? withTiming(0, { duration: 0 })
          : withDelay(MENU_ANIMATION_DURATION, withTiming(1, { duration: 0 }))
        : 1,
      transform: [{ scale: itemScale.value }]
    }
  })

  const animatedPortalStyle = useAnimatedStyle(() => {
    const transform = [
      // 与菜单同步位移, 菜单放不下时整体向合适方向挤开
      // 位置须在 active=1 后才读取, 避免展开瞬间使用上一菜单的旧 tY
      {
        translateY: isActive.value && active.value === 1
          ? withSpring(position.value?.tY ?? 0, SPRING_CONFIGURATION)
          : withTiming(0, { duration: MENU_ANIMATION_DURATION })
      },
      { scale: itemScale.value }
    ] as TransformArrayItem[]

    return {
      zIndex: 10,
      position: 'absolute',
      top: itemRectY.value,
      left: itemRectX.value,
      width: itemRectWidth.value,
      height: itemRectHeight.value,
      opacity: wasActivated.value
        ? isActive.value
          ? withTiming(1, { duration: 0 })
          : withDelay(MENU_ANIMATION_DURATION, withTiming(0, { duration: 0 }))
        : 0,
      transform
    }
  })

  const animatedPortalProps = useAnimatedProps<ViewProps>(() => ({
    pointerEvents: isActive.value ? 'auto' : 'none'
  }))

  return {
    containerRef,
    onStart,
    isActive,
    isAnimating,
    scaleBack,
    animatedContainerStyle,
    animatedPortalStyle,
    animatedPortalProps
  }
}
