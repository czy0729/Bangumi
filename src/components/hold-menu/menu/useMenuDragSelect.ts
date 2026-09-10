/*
 * @Author: czy0729
 * @Date: 2026-09-10 07:10:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 10:30:00
 */
import { useCallback, useMemo } from 'react'
import { Gesture } from 'react-native-gesture-handler'
import { scrollTo, useSharedValue } from 'react-native-reanimated'
import { scheduleOnRN } from '@utils'
import { MENU_SCROLL_THRESHOLD } from '../ds'
import { useHoldMenu, useHoldMenuParams } from '../context'
import { getMenuItemHeight, hapticFeedback, resolveHoverIndex } from '../utils'

/**
 * 菜单层长按拖选: 手指按在菜单上长按 (静止约 150ms) 才进入拖选, 长按命中项高亮并震动
 * - 非滚动菜单: 移动切换高亮, 移出菜单矩形 (横竖都判) 取消高亮, 松手选中
 * - 可滚动菜单: 手指移动直接拖动内容滚动, 高亮不切换, 上下移动超过一个菜单项高度即取消高亮
 * 命中测试用 MenuItems onLayout 实测的坐标, 避免按公式估算导致的逐项累积误差
 * 普通滑动不会激活长按, 因此 ScrollView 的原生滚动完全不受影响
 */
export const useMenuDragSelect = () => {
  const { active, position, close, highlight } = useHoldMenu()
  const { highlightIndex, scrollOffset, scrollViewRef, rowOffsets, contentHeight } = highlight
  const { params } = useHoldMenuParams()
  // 用 params 作依赖, 避免 params?.items || [] 每次渲染产生新数组导致 useMemo 失效
  const selectable = useMemo(() => (params?.items || []).map(item => !item.isTitle), [params])
  const scrollable = (params?.items?.length || 0) > MENU_SCROLL_THRESHOLD
  // 取消高亮的位移阈值, 约一个菜单项高度
  const cancelDistance = getMenuItemHeight()

  // 长按是否已激活, 激活后才接管滚动与高亮, 避免普通滑动被拦截
  const isLongPressed = useSharedValue(false)
  // 长按起点与起点滚动偏移, 用于把手指位移换算成内容滚动量
  const startY = useSharedValue(0)
  const startOffset = useSharedValue(0)

  // 松手选中: 执行对应菜单项回调后关闭菜单 (JS 线程, 由手势 worklet 调度)
  const selectItem = useCallback(
    (index: number, pageX: number, pageY: number) => {
      const item = params?.items?.[index]
      if (!item || item.isTitle) return
      item.onPress?.({ pageX, pageY }, ...(params?.actionParams?.[item.text] || []))
      close()
    },
    [params, close]
  )

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

  // 高亮跟随手指切换 (worklet), 仅非滚动菜单使用
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

  const gesture = useMemo(
    () =>
      Gesture.LongPress()
        .minDuration(150)
        // 允许手指移出菜单继续拖动
        .shouldCancelWhenOutside(false)
        .maxDistance(99999)
        .onStart(event => {
          'worklet'
          if (active.value !== 1) return
          isLongPressed.value = true
          startY.value = event.absoluteY
          startOffset.value = scrollOffset.value

          const index = hitTest(event.absoluteX, event.absoluteY)
          highlightIndex.value = index
          if (index >= 0) {
            scheduleOnRN(hapticFeedback, 'Selection')
          }
        })
        .onTouchesMove(event => {
          'worklet'
          if (!isLongPressed.value) return
          const touch = event.allTouches[0]
          if (!touch) return
          const pos = position.value
          if (!pos) return

          const maxOffset = Math.max(0, contentHeight.value - pos.height)
          if (scrollable && maxOffset > 0) {
            // 内容溢出: 手指位移直接拖动内容
            const next = startOffset.value - (touch.absoluteY - startY.value)
            const clamped = next < 0 ? 0 : next > maxOffset ? maxOffset : next
            if (clamped !== scrollOffset.value) {
              scrollTo(scrollViewRef, 0, clamped, false)
              scrollOffset.value = clamped
            }
            // 高亮不切换: 上下移动超过一个菜单项高度即取消, 避免松手误触选中
            if (Math.abs(touch.absoluteY - startY.value) >= cancelDistance) {
              highlightIndex.value = -1
            }
            return
          }

          // 非滚动菜单: 高亮跟随手指切换, 移出菜单由 hitTest 取消
          updateHover(touch.absoluteX, touch.absoluteY)
        })
        .onFinalize(event => {
          'worklet'
          isLongPressed.value = false
          if (active.value !== 1) return
          const index = highlightIndex.value
          if (index < 0) return
          highlightIndex.value = -1
          scheduleOnRN(selectItem, index, event.absoluteX, event.absoluteY)
        }),
    [
      active,
      position,
      scrollable,
      cancelDistance,
      contentHeight,
      scrollOffset,
      scrollViewRef,
      highlightIndex,
      hitTest,
      updateHover,
      selectItem,
      isLongPressed,
      startY,
      startOffset
    ]
  )

  return { gesture }
}

export default useMenuDragSelect
