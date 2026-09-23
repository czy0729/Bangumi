/*
 * @Author: czy0729
 * @Date: 2023-12-27 15:25:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 08:30:28
 */
import React, { useCallback, useMemo } from 'react'
import { Animated, View } from 'react-native'
import PagerView from 'react-native-pager-view'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { NestedScrollView, NestedScrollViewHeader } from '@sdcx/nested-scroll'
import { HEADER_HEIGHT, STATUS_BAR_HEIGHT, TABS_HEADER_HEIGHT } from '@styles'
import AnimatedNavbar from '../animated-navbar'
import Background from '../background'
import { useAnimatedNavbar } from '../hooks/useAnimatedNavbar'
import { useAnimateScrollView } from '../hooks/useAnimatedScrollView'
import { usePagerKeep } from '../hooks/usePagerKeep'
import { usePagerView } from '../hooks/usePagerView'
import { LazyLoadView } from '../lazy-load-view'
import ParallaxHeader from '../parallax-header'
import TabBar from '../tab-bar'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { NestedScrollEvent } from '@sdcx/nested-scroll'
import type { Props as NestedScrollParallaxHeaderProps } from './types'
export type { NestedScrollParallaxHeaderProps }

const AnimatedPagerView = Animated.createAnimatedComponent<typeof PagerView>(PagerView)

export const NestedScrollParallaxHeader = observer(
  ({
    pages,
    initialPage,
    imageHeight = _.parallaxImageHeight,
    imageSource,
    blurRadius,
    lazyDistance = Infinity,
    stickyHeight = TABS_HEADER_HEIGHT,
    spacing,
    tabStyle,
    tabBarLocalKey,
    HeaderComponent,
    OverflowHeaderComponent,
    TopNavbarComponent,
    TabBarLeft,
    BackgroundComponent,
    renderLabel,
    onIndexChange,
    children
  }: NestedScrollParallaxHeaderProps) => {
    r(COMPONENT)

    const [scroll, , scale, translateYDown, translateYUp, fixed] = useAnimateScrollView(
      imageHeight,
      stickyHeight,
      true
    )

    const {
      pagerRef,
      setPage,
      page,
      position,
      offset,
      isIdle,
      scrollRange,
      onPageScroll,
      onPageSelected,
      onPageScrollStateChanged
    } = usePagerView({
      initialPage,
      onIndexChange
    })

    const keepRange = usePagerKeep({ page, isIdle, scrollRange, distance: lazyDistance })

    const [headerOpacity, overflowHeaderOpacity] = useAnimatedNavbar(
      scroll,
      imageHeight,
      HEADER_HEIGHT
    )

    const handleScroll = useCallback(
      (event: NestedScrollEvent) => {
        Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scroll
              }
            }
          }
        ])(event)
      },
      [scroll]
    )

    const elNavbar = useMemo(
      () => (
        <AnimatedNavbar
          statusBarHeight={STATUS_BAR_HEIGHT}
          headerHeight={HEADER_HEIGHT}
          headerOpacity={headerOpacity}
          overflowHeaderOpacity={overflowHeaderOpacity}
          OverflowHeaderComponent={OverflowHeaderComponent}
          TopNavbarComponent={TopNavbarComponent}
        />
      ),
      [OverflowHeaderComponent, TopNavbarComponent, headerOpacity, overflowHeaderOpacity]
    )

    const elParallaxHeader = useMemo(
      () => (
        <ParallaxHeader
          topBarHeight={HEADER_HEIGHT}
          height={imageHeight}
          imageSource={imageSource}
          blurRadius={blurRadius}
          scale={scale}
          translateYDown={translateYDown}
          translateYUp={translateYUp}
          headerOpacity={headerOpacity}
          overflowHeaderOpacity={overflowHeaderOpacity}
        >
          {HeaderComponent}
        </ParallaxHeader>
      ),
      [
        HeaderComponent,
        blurRadius,
        headerOpacity,
        imageHeight,
        imageSource,
        overflowHeaderOpacity,
        scale,
        translateYDown,
        translateYUp
      ]
    )

    const elTabBar = useMemo(
      () => (
        <TabBar
          tabs={pages}
          position={position}
          offset={offset}
          page={page}
          isIdle={isIdle}
          spacing={spacing}
          tabStyle={tabStyle}
          tabBarLocalKey={tabBarLocalKey}
          TabBarLeft={TabBarLeft}
          renderLabel={renderLabel}
          onTabPress={setPage}
        />
      ),
      [
        TabBarLeft,
        isIdle,
        offset,
        page,
        pages,
        position,
        renderLabel,
        setPage,
        spacing,
        tabBarLocalKey,
        tabStyle
      ]
    )

    const elAnimatedPagerView = useMemo(
      () => (
        <AnimatedPagerView
          ref={pagerRef}
          style={styles.pager}
          initialPage={page}
          overdrag
          overScrollMode='always'
          onPageScroll={onPageScroll}
          onPageSelected={onPageSelected}
          onPageScrollStateChanged={onPageScrollStateChanged}
        >
          {React.Children.map(children, (child, index) => (
            // PagerView 的子节点数量必须恒定, 未激活的页用占位 View 保号
            <LazyLoadView
              current={page}
              index={index}
              range={keepRange}
              placeholder={<View style={styles.fill} />}
            >
              {child}
            </LazyLoadView>
          ))}
        </AnimatedPagerView>
      ),
      [children, keepRange, onPageScroll, onPageScrollStateChanged, onPageSelected, page, pagerRef]
    )

    const elBackground = useMemo(
      () =>
        BackgroundComponent ? (
          <Background height={imageHeight} scroll={scroll}>
            {typeof BackgroundComponent === 'function'
              ? BackgroundComponent(fixed)
              : BackgroundComponent}
          </Background>
        ) : null,
      [BackgroundComponent, imageHeight, fixed, scroll]
    )

    return (
      <View style={styles.fill}>
        {elBackground}
        {elNavbar}
        <NestedScrollView bounces>
          <NestedScrollViewHeader stickyHeight={stickyHeight} onScroll={handleScroll}>
            {elParallaxHeader}
            {elTabBar}
          </NestedScrollViewHeader>
          {elAnimatedPagerView}
        </NestedScrollView>
      </View>
    )
  }
)

export default NestedScrollParallaxHeader
