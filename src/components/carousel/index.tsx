/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  InteractionManager,
  Platform,
  ScrollView,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent
} from 'react-native'
import { observer } from 'mobx-react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import {
  getChildrenCount,
  getInitialIndex,
  getNextOffset,
  getUpdatedIndex
} from './utils'

import type { CarouselStyle } from './types'
import type { Props as CarouselProps } from './types'
export type { CarouselProps }

/**
 * 轮播图, 基于 ScrollView 分页, dot 激活态使用 reanimated 过渡动画
 */
function Carousel({
  afterChange,
  autoplay = false,
  autoplayInterval = 3000,
  bounces = true,
  children,
  dotActiveStyle = {},
  dots = true,
  dotStyle = {},
  infinite = false,
  onMomentumScrollEnd,
  onScrollBeginDrag,
  pagination,
  selectedIndex = 0,
  styles: stylesOverride,
  style,
  vertical = false
}: CarouselProps) {
  r(COMPONENT)

  const styles = memoStyles()
  const count = getChildrenCount(children)
  const [current, setCurrent] = useState(() => getInitialIndex(count, selectedIndex))
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [isScrolling, setIsScrolling] = useState(false)
  const [autoplayEnd, setAutoplayEnd] = useState(false)

  const scrollRef = useRef<ScrollView>(null)
  const currentRef = useRef(current)
  const offsetRef = useRef({ x: 0, y: 0 })
  const isScrollingRef = useRef(false)
  const autoplayTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout>>()

  const step = vertical ? size.height : size.width

  const mergedStyles = useMemo<CarouselStyle>(
    () => ({ ...styles, ...stylesOverride }),
    [styles, stylesOverride]
  )

  const setCurrentSafe = useCallback((index: number) => {
    currentRef.current = index
    setCurrent(index)
  }, [])

  const handleAutoplay = useCallback(() => {
    clearTimeout(autoplayTimerRef.current)
    if (!Array.isArray(children) || !autoplay || isScrollingRef.current || autoplayEnd) return
    autoplayTimerRef.current = setTimeout(() => {
      if (!infinite && currentRef.current === count - 1) {
        setAutoplayEnd(true)
        return
      }
      if (isScrollingRef.current || count < 2) return
      const offset = getNextOffset(currentRef.current, count, infinite, step)
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
          handleScrollEnd({ nativeEvent: { position: offset / step } } as any)
        }, 0)
      }
    }, autoplayInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, autoplayInterval, children, count, infinite, step, autoplayEnd])

  const handleScrollEnd = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent> & { nativeEvent: { position?: number } }) => {
      isScrollingRef.current = false
      setIsScrolling(false)
      let offset = e.nativeEvent.contentOffset as any
      if (!offset && e.nativeEvent.position !== undefined) {
        offset = { x: e.nativeEvent.position * size.width, y: e.nativeEvent.position * size.height }
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [afterChange, count, infinite, onMomentumScrollEnd, size.height, size.width, step, vertical]
  )

  const handleScrollBegin = useCallback(
    (e: any) => {
      isScrollingRef.current = true
      setIsScrolling(true)
      if (onScrollBeginDrag) onScrollBeginDrag(e)
    },
    [onScrollBeginDrag]
  )

  const handleLayout = useCallback(
    (e: any) => {
      const width = e.nativeEvent.layout.width
      setSize(prev => ({ ...prev, width }))
      const index = getInitialIndex(count, selectedIndex)
      const offsetX = vertical ? 0 : width * (index + (infinite ? 1 : 0))
      offsetRef.current = { x: offsetX, y: 0 }
      if (Platform.OS === 'android') {
        InteractionManager.runAfterInteractions(() => {
          scrollRef.current?.scrollTo({ x: offsetX, y: 0, animated: false })
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [count, infinite, selectedIndex, vertical]
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

  if (!children) {
    return null
  }

  const pageStyle = { width: size.width }
  const childrenArray = React.Children.toArray(children)
  const pages =
    count > 1 && infinite
      ? [childrenArray[count - 1], ...childrenArray, childrenArray[0]]
      : childrenArray

  return (
    <View
      onLayout={handleLayout}
      style={vertical && size.height > 0 ? { height: size.height } : undefined}
    >
      <ScrollView
        ref={scrollRef}
        horizontal={!vertical}
        pagingEnabled
        bounces={bounces}
        scrollEventThrottle={100}
        removeClippedSubviews={false}
        automaticallyAdjustContentInsets={false}
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style}
        contentOffset={offsetRef.current}
        onScrollBeginDrag={handleScrollBegin}
        onMomentumScrollEnd={handleScrollEnd}
      >
        {pages.map((page, index) => (
          <View style={pageStyle} key={index}>
            {page}
          </View>
        ))}
      </ScrollView>
      {dots &&
        (pagination ? (
          pagination({
            styles: mergedStyles,
            vertical,
            current,
            count,
            dotStyle,
            dotActiveStyle
          })
        ) : (
          <Pagination
            styles={mergedStyles}
            vertical={vertical}
            current={current}
            count={count}
            dotStyle={dotStyle}
            dotActiveStyle={dotActiveStyle}
          />
        ))}
    </View>
  )
}

function Pagination({
  styles,
  vertical,
  current,
  count,
  dotStyle,
  dotActiveStyle
}: {
  styles: CarouselStyle
  vertical: boolean
  current: number
  count: number
  dotStyle?: object
  dotActiveStyle?: object
}) {
  const dots = []
  for (let i = 0; i < count; i++) {
    dots.push(
      <Dot
        key={`dot-${i}`}
        active={i === current}
        styles={styles}
        dotStyle={dotStyle}
        dotActiveStyle={dotActiveStyle}
      />
    )
  }
  const positionStyle = vertical ? styles.paginationY : styles.paginationX
  return (
    <View style={[styles.pagination, positionStyle]}>
      <View style={{ flexDirection: vertical ? 'column' : 'row' }}>{dots}</View>
    </View>
  )
}

function Dot({
  active,
  styles,
  dotStyle,
  dotActiveStyle
}: {
  active: boolean
  styles: CarouselStyle
  dotStyle?: object
  dotActiveStyle?: object
}) {
  const width = useSharedValue(active ? 24 : 8)
  useEffect(() => {
    width.value = withTiming(active ? 24 : 8, { duration: 200 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])
  const animatedStyle = useAnimatedStyle(() => ({ width: width.value }))
  return (
    <Animated.View
      style={[
        styles.pointStyle,
        styles.spaceStyle,
        dotStyle,
        animatedStyle,
        active && styles.pointActiveStyle,
        active && dotActiveStyle
      ]}
    />
  )
}

export default observer(Carousel)