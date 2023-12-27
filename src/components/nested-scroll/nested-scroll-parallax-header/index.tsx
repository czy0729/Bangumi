/*
 * @Author: czy0729
 * @Date: 2023-12-27 15:25:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-27 17:40:49
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
import { usePagerView } from '../hooks/usePagerView'
import { styles } from './styles'
import { Props as NestedScrollParallaxHeaderProps } from './types'

export { NestedScrollParallaxHeaderProps }

const AnimatedPagerView = Animated.createAnimatedComponent<typeof PagerView>(PagerView)

export function NestedScrollParallaxHeader({
  pages,
  imageHeight = 220,
  imageSource,
  stickyHeight = 160,
  HeaderComponent,
  OverflowHeaderComponent,
  TopNavbarComponent,
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
  } = usePagerView()

  const onScroll = useCallback(
    (event: NestedScrollEvent) => {
      Animated.event([
        {
          nativeEvent: { contentOffset: { y: scroll } }
        }
      ])(event)
    },
    [scroll]
  )

  return (
    <View style={styles.fill}>
      <NestedScrollView bounces>
        <NestedScrollViewHeader stickyHeight={stickyHeight} onScroll={onScroll}>
          <ParallaxHeader
            topBarHeight={_.headerHeight}
            imageHeight={imageHeight}
            imageSource={imageSource}
            scale={scale}
            translateYDown={translateYDown}
            translateYUp={translateYUp}
            // onScroll={onScroll}
          >
            {HeaderComponent}
          </ParallaxHeader>
          <TabBar
            tabs={pages}
            onTabPress={setPage}
            position={position}
            offset={offset}
            page={page}
            isIdle={isIdle}
          />
        </NestedScrollViewHeader>
        <AnimatedPagerView
          ref={pagerRef}
          style={styles.pager}
          overdrag
          overScrollMode='always'
          onPageScroll={onPageScroll}
          onPageSelected={onPageSelected}
          onPageScrollStateChanged={onPageScrollStateChanged}
        >
          {children}
        </AnimatedPagerView>
      </NestedScrollView>
      <AnimatedNavbar
        scroll={scroll}
        headerHeight={_.headerHeight}
        statusBarHeight={_.statusBarHeight}
        imageHeight={imageHeight}
        OverflowHeaderComponent={OverflowHeaderComponent}
        TopNavbarComponent={TopNavbarComponent}
      />
    </View>
  )
}

export default NestedScrollParallaxHeader
