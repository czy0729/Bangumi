/*
 * @Author: czy0729
 * @Date: 2023-12-27 15:25:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:08:13
 */
import React, { useCallback, useMemo } from 'react'
import { Animated, View } from 'react-native'
import PagerView from 'react-native-pager-view'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { NestedScrollEvent, NestedScrollView, NestedScrollViewHeader } from '@sdcx/nested-scroll'
import { AnimatedNavbar } from '../animated-navbar'
import { useAnimatedNavbar } from '../hooks/useAnimatedNavbar'
import { useAnimateScrollView } from '../hooks/useAnimatedScrollView'
import { usePagerView } from '../hooks/usePagerView'
import { ParallaxHeader } from '../parallax-header'
import { TabBar } from '../tab-bar'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props as NestedScrollParallaxHeaderProps } from './types'

export { NestedScrollParallaxHeaderProps }

const AnimatedPagerView = Animated.createAnimatedComponent<typeof PagerView>(PagerView)

export function NestedScrollParallaxHeader({
  pages,
  initialPage,
  imageHeight = _.parallaxImageHeight,
  imageSource,
  blurRadius,
  stickyHeight = _.tabsHeaderHeight,
  spacing,
  tabStyle,
  tabBarLocalKey,
  HeaderComponent,
  OverflowHeaderComponent,
  TopNavbarComponent,
  TabBarLeft,
  renderLabel,
  onIndexChange,
  children
}: NestedScrollParallaxHeaderProps) {
  r(COMPONENT)

  const [scroll, , scale, translateYDown, translateYUp] = useAnimateScrollView(imageHeight, true)

  const {
    pagerRef,
    setPage,
    page,
    position,
    offset,
    isIdle,
    onPageScroll,
    onPageSelected,
    onPageScrollStateChanged
  } = usePagerView({
    initialPage,
    onIndexChange
  })

  const [headerOpacity, overflowHeaderOpacity] = useAnimatedNavbar(
    scroll,
    imageHeight,
    _.headerHeight
  )

  const onScroll = useCallback(
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
        statusBarHeight={_.statusBarHeight}
        headerHeight={_.headerHeight}
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
        topBarHeight={_.headerHeight}
        imageHeight={imageHeight}
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
        {children}
      </AnimatedPagerView>
    ),
    [children, onPageScroll, onPageScrollStateChanged, onPageSelected, page, pagerRef]
  )

  return (
    <View style={styles.fill}>
      {elNavbar}
      <NestedScrollView bounces>
        <NestedScrollViewHeader stickyHeight={stickyHeight} onScroll={onScroll}>
          {elParallaxHeader}
          {elTabBar}
        </NestedScrollViewHeader>
        {elAnimatedPagerView}
      </NestedScrollView>
    </View>
  )
}

export default NestedScrollParallaxHeader
