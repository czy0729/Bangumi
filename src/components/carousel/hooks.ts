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

  const setCurrentSafe = useCallback((index: number) => {
    currentRef.current = index
    setCurrent(index)
    setVisibleIndex(index)
  }, [])

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
        if (Platform.OS === 'android') {
          const index = result.index + (infinite ? 1 : 0)
          setTimeout(() => {
            scrollRef.current?.scrollTo({
              x: vertical ? 0 : size.width * index,
              y: vertical ? size.height * index : 0,
              animated: false
            })
          }, 10)
        }
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
      if (vertical) {
        scrollRef.current?.scrollTo({ x: 0, y: target, animated: true })
      } else {
        scrollRef.current?.scrollTo({ x: target, y: 0, animated: true })
      }
      setCurrentSafe(index)
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
    scrollRef,
    current,
    visibleIndex,
    isScrolling,
    autoplayEnd,
    offsetRef,
    handleScroll,
    handleScrollBegin,
    handleScrollEnd,
    handleLayout,
    handleDotPress,
    setCurrentSafe
  }
}
