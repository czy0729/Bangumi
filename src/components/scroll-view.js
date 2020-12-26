/*
 * @Author: czy0729
 * @Date: 2020-12-10 20:03:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-27 01:30:53
 */
import React, { useRef } from 'react'
import { ScrollView as RNScrollView } from 'react-native'
import ScrollToTop from './scroll-to-top'

function ScrollView({ scrollToTop, children, ...other }) {
  const scrollViewEl = useRef(null)
  return (
    <RNScrollView ref={ref => (scrollViewEl.current = ref?.scrollTo)} {...other}>
      {children}
      {scrollToTop && <ScrollToTop scrollTo={scrollViewEl.current} />}
    </RNScrollView>
  )
}

export default ScrollView
