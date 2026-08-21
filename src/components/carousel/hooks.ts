/*
 * @Author: czy0729
 * @Date: 2026-08-12 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-12 10:00:00
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { Platform } from 'react-native'
import { runAfter } from '@utils'
import { getInitialIndex, getNextOffset, getUpdatedIndex, getVisibleIndex } from './utils'

import type { ScrollView, NativeSyntheticEvent } from 'react-native'
import type { TimerRef } from '@types'
import type { CarouselEvent, UseCarouselOptions } from './types'

/** 轮播图滚动状态与自动播放逻辑 */
export const useCarousel = ({
  afterChange,
  autoplay = false,
  autoplayInterval = 3000,
  children,
  count,
  infinite = false,
  onMomentumScrollEnd,
  onScrollBeginDrag,
  onSizeChange,
  selectedIndex = 0,
  size,
  vertical = false
}: UseCarouselOptions) => {
  const [current, setCurrent] = useState(() => getInitialIndex(count, selectedIndex))
  const [visibleIndex, setVisibleIndex] = useState(() => getInitialIndex(count, selectedIndex))
  const [isScrolling, setIsScrolling] = useState(false)
  const [autoplayEnd, setAutoplayEnd] = useState(false)

  const scrollRef = useRef<ScrollView>(null)
  const currentRef = useRef(current)
  const offsetRef = useRef({ x: 0, y: 0 })
  const isScrollingRef = useRef(false)
  const autoplayTimerRef = useRef<TimerRef>()
  const scrollEndTimerRef = useRef<TimerRef>()

  const step = vertical ? size.height : size.width

  const setCurrentSafe = useCallback(
    (index: number) => {
      currentRef.current = index
      setCurrent(index)
      // 可见窗口使用原始坐标 (infinite 模式含首尾克隆页偏移), 与 handleScroll 写入的坐标空间保持一致,
      // 否则 iOS 无回跳复位时窗口会落在克隆页之外导致白屏
      setVisibleIndex(index + (infinite ? 1 : 0))
    },
    [infinite]
  )

  /** 滚动中实时计算可见页 (窗口化渲染依据) */
  const handleScroll = useCallback(
    (e: CarouselEvent) => {
      const offset = vertical ? e.nativeEvent.contentOffset.y : e.nativeEvent.contentOffset.x
      setVisibleIndex(getVisibleIndex(offset, step))
    },
    [step, vertical]
  )

  const handleScrollEnd = useCallback(
    (e: CarouselEvent) => {
      isScrollingRef.current = false
      setIsScrolling(false)
      let offset = e.nativeEvent.contentOffset
      if (!offset && e.nativeEvent.position !== undefined) {
        offset = {
          x: e.nativeEvent.position * size.width,
          y: e.nativeEvent.position * size.height
        }
      }
      if (!offset) return

      const diff = vertical ? offset.y - offsetRef.current.y : offset.x - offsetRef.current.x
      offsetRef.current = offset
      const result = getUpdatedIndex(currentRef.current, diff, step, count, infinite)
      setCurrentSafe(result.index)
      if (result.loopJump) {
        offsetRef.current = vertical ? { x: 0, y: result.offsetTo } : { x: result.offsetTo, y: 0 }
        // 双平台都需无动画复位到真实页: iOS 不复位会停留在克隆页, 窗口化渲染不覆盖克隆页导致白屏
        const index = result.index + (infinite ? 1 : 0)
        setTimeout(() => {
          scrollRef.current?.scrollTo({
            x: vertical ? 0 : size.width * index,
            y: vertical ? size.height * index : 0,
            animated: false
          })
        }, 10)
      }
      if (afterChange) afterChange(result.index)
      clearTimeout(scrollEndTimerRef.current)
      scrollEndTimerRef.current = setTimeout(() => {
        handleAutoplay()
        if (onMomentumScrollEnd) onMomentumScrollEnd(e)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [afterChange, count, infinite, onMomentumScrollEnd, size.height, size.width, step, vertical]
  )

  const handleScrollBegin = useCallback(
    (e: CarouselEvent) => {
      isScrollingRef.current = true
      setIsScrolling(true)
      if (onScrollBeginDrag) onScrollBeginDrag(e)
    },
    [onScrollBeginDrag]
  )

  const handleAutoplay = useCallback(() => {
    clearTimeout(autoplayTimerRef.current)
    if (!Array.isArray(children) || !autoplay || isScrollingRef.current || autoplayEnd) return
    autoplayTimerRef.current = setTimeout(() => {
      if (!infinite && currentRef.current === count - 1) {
        setAutoplayEnd(true)
        return
      }
      if (isScrollingRef.current || count < 2) return
      const offset = getNextOffset(currentRef.current, infinite, step)
      if (vertical) {
        scrollRef.current?.scrollTo({ x: 0, y: offset })
      } else {
        scrollRef.current?.scrollTo({ x: offset, y: 0 })
      }
      isScrollingRef.current = true
      setIsScrolling(true)
      setAutoplayEnd(false)
      if (Platform.OS === 'android') {
        setTimeout(() => {
          handleScrollEnd({ nativeEvent: { position: offset / step } } as CarouselEvent)
        }, 0)
      }
    }, autoplayInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, autoplayInterval, children, count, infinite, step, autoplayEnd])

  const handleLayout = useCallback(
    (e: NativeSyntheticEvent<{ layout: { width: number } }>) => {
      const width = e.nativeEvent.layout.width
      if (onSizeChange) onSizeChange(prev => ({ ...prev, width }))
      const index = getInitialIndex(count, selectedIndex)
      const offsetX = vertical ? 0 : width * (index + (infinite ? 1 : 0))
      offsetRef.current = { x: offsetX, y: 0 }
      // 初始定位到 infinite 模式的偏移页, 同步可见窗口
      setVisibleIndex(index + (infinite ? 1 : 0))
      if (Platform.OS === 'android') {
        runAfter(() => {
          scrollRef.current?.scrollTo({ x: offsetX, y: 0, animated: false })
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [count, infinite, onSizeChange, selectedIndex, vertical]
  )

  /** 点击分页圆点跳转到对应页 */
  const handleDotPress = useCallback(
    (index: number) => {
      if (index === currentRef.current || !step) return
      const target = step * (index + (infinite ? 1 : 0))
      // 同步基准偏移, 滚动结束 handleScrollEnd 以 offsetRef 差值计算页码, 不同步会以陈旧值算出错页;
      // 置滚动锁避免跳页动画期间自动播放计时器插入第二次 scrollTo
      offsetRef.current = vertical ? { x: 0, y: target } : { x: target, y: 0 }
      setCurrentSafe(index)
      isScrollingRef.current = true
      setIsScrolling(true)
      if (vertical) {
        scrollRef.current?.scrollTo({ x: 0, y: target, animated: true })
      } else {
        scrollRef.current?.scrollTo({ x: target, y: 0, animated: true })
      }
    },
    [infinite, setCurrentSafe, step, vertical]
  )

  useEffect(() => {
    return () => {
      clearTimeout(autoplayTimerRef.current)
      clearTimeout(scrollEndTimerRef.current)
    }
  }, [])

  useEffect(() => {
    handleAutoplay()
    return () => clearTimeout(autoplayTimerRef.current)
  }, [handleAutoplay])

  return {
    /** 外部绑定到 ScrollView 的 ref */
    scrollRef,

    /** 当前激活的页码索引 */
    current,

    /** 当前可见窗口的索引 (窗口化渲染依据) */
    visibleIndex,

    /** 是否正在滚动中 */
    isScrolling,

    /** 自动播放是否已结束 (非无限模式滚到最后一项后为真) */
    autoplayEnd,

    /** 当前滚动偏移量 ref, 用于计算翻页方向及无限模式回跳 */
    offsetRef,

    /** 滚动中实时回调, 更新可见窗口 */
    handleScroll,

    /** 滚动开始回调, 标记滚动状态并触发 onScrollBeginDrag */
    handleScrollBegin,

    /** 滚动结束回调, 计算目标页并触发 afterChange / onMomentumScrollEnd */
    handleScrollEnd,

    /** 布局回调, 完成初始定位与宽度同步 */
    handleLayout,

    /** 点击分页圆点跳转到对应页 */
    handleDotPress,

    /** 安全更新 current 与 visibleIndex 的封装方法 */
    setCurrentSafe
  }
}
