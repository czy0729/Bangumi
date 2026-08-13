/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-12 10:00:00
 */
import { Children, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { useCarousel } from './hooks'
import Pagination from './pagination'
import { getChildrenCount, isInWindow } from './utils'
import { COMPONENT } from './ds'

import type { Props as CarouselProps } from './types'
export type { CarouselProps }

/**
 * 轮播图, 基于 ScrollView 分页, dot 激活态使用 reanimated 过渡动画
 */
export const Carousel = observer(
  ({
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
  }: CarouselProps) => {
    r(COMPONENT)

    const count = getChildrenCount(children)
    const [size, setSize] = useState({ width: 0, height: 0 })

    const {
      scrollRef,
      current,
      visibleIndex,
      offsetRef,
      handleScroll,
      handleScrollBegin,
      handleScrollEnd,
      handleLayout,
      handleDotPress
    } = useCarousel({
      afterChange,
      autoplay,
      autoplayInterval,
      children,
      count,
      infinite,
      onMomentumScrollEnd,
      onScrollBeginDrag,
      onSizeChange: setSize,
      selectedIndex,
      size,
      vertical
    })

    if (!children) {
      return null
    }

    const pageStyle = { width: size.width }
    const childrenArray = Children.toArray(children)
    const pages =
      count > 1 && infinite
        ? [childrenArray[count - 1], ...childrenArray, childrenArray[0]]
        : childrenArray

    /** 窗口化渲染: 只渲染当前页 ± 缓冲页, 其余占位保持分页宽度 */
    const RENDER_BUFFER = 1

    return (
      <View
        style={vertical && size.height > 0 ? { height: size.height } : undefined}
        onLayout={handleLayout}
      >
        <ScrollView
          ref={scrollRef}
          horizontal={!vertical}
          pagingEnabled
          bounces={bounces}
          scrollEventThrottle={100}
          removeClippedSubviews
          automaticallyAdjustContentInsets={false}
          directionalLockEnabled
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style}
          contentOffset={offsetRef.current}
          onScrollBeginDrag={handleScrollBegin}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleScrollEnd}
        >
          {pages.map((page, index) => (
            <View style={pageStyle} key={index}>
              {isInWindow(index, visibleIndex, RENDER_BUFFER, pages.length) ? page : null}
            </View>
          ))}
        </ScrollView>
        {dots &&
          (pagination ? (
            pagination({
              stylesOverride,
              vertical,
              current,
              count,
              dotStyle,
              dotActiveStyle,
              onDotPress: handleDotPress
            })
          ) : (
            <Pagination
              stylesOverride={stylesOverride}
              vertical={vertical}
              current={current}
              count={count}
              dotStyle={dotStyle}
              dotActiveStyle={dotActiveStyle}
              onDotPress={handleDotPress}
            />
          ))}
      </View>
    )
  }
)

export default Carousel
