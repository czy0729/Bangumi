/*
 * @Author: czy0729
 * @Date: 2023-12-27 15:25:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 15:59:26
 */
import React, { useCallback } from 'react'
import { Animated, View } from 'react-native'
import PagerView from 'react-native-pager-view'
import {
  NestedScrollView,
  NestedScrollViewHeader,
  NestedScrollEvent
} from '@sdcx/nested-scroll'
import { _ } from '@stores'
import { ParallaxHeader } from '../parallax-header'
import { AnimatedNavbar } from '../animated-navbar'
import { TabBar } from '../tab-bar'
import { useAnimateScrollView } from '../hooks/useAnimatedScrollView'
import { useAnimatedNavbar } from '../hooks/useAnimatedNavbar'
import { usePagerView } from '../hooks/usePagerView'
import { styles } from './styles'
import { Props as NestedScrollParallaxHeaderProps } from './types'

export { NestedScrollParallaxHeaderProps }

const AnimatedPagerView = Animated.createAnimatedComponent<typeof PagerView>(PagerView)

export function NestedScrollParallaxHeader({
  pages,
  initialPage,
  imageHeight = _.parallaxImageHeight,
  imageSource,
  stickyHeight = _.tabsHeaderHeight,
  spacing,
  tabBarLocalKey,
  HeaderComponent,
  OverflowHeaderComponent,
  TopNavbarComponent,
  TabBarLeft,
  renderLabel,
  onIndexChange,
  children
}: NestedScrollParallaxHeaderProps) {
  const [scroll, , scale, translateYDown, translateYUp] = useAnimateScrollView(
    imageHeight,
    true
  )

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

  return (
    <View style={styles.fill}>
      <AnimatedNavbar
        statusBarHeight={_.statusBarHeight}
        headerHeight={_.headerHeight}
        headerOpacity={headerOpacity}
        overflowHeaderOpacity={overflowHeaderOpacity}
        OverflowHeaderComponent={OverflowHeaderComponent}
        TopNavbarComponent={TopNavbarComponent}
      />
      <NestedScrollView bounces>
        <NestedScrollViewHeader stickyHeight={stickyHeight} onScroll={onScroll}>
          <ParallaxHeader
            topBarHeight={_.headerHeight}
            imageHeight={imageHeight}
            imageSource={imageSource}
            scale={scale}
            translateYDown={translateYDown}
            translateYUp={translateYUp}
            headerOpacity={headerOpacity}
            overflowHeaderOpacity={overflowHeaderOpacity}
          >
            {HeaderComponent}
          </ParallaxHeader>
          <TabBar
            tabs={pages}
            position={position}
            offset={offset}
            page={page}
            isIdle={isIdle}
            spacing={spacing}
            tabBarLocalKey={tabBarLocalKey}
            TabBarLeft={TabBarLeft}
            renderLabel={renderLabel}
            onTabPress={setPage}
          />
        </NestedScrollViewHeader>
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
      </NestedScrollView>
    </View>
  )
}

export default NestedScrollParallaxHeader
