/*
 * @Author: czy0729
 * @Date: 2020-12-10 20:03:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-09 11:46:25
 */
import React, { useRef } from 'react'
import { ScrollView as RNScrollView } from 'react-native'
import { ScrollToTop } from './scroll-to-top'

export const ScrollView = ({ scrollToTop, children, ...other }) => {
  const scrollViewEl = useRef(null)
  return (
    <RNScrollView
      ref={ref => (scrollViewEl.current = ref?.scrollTo)}
      {...other}
    >
      {children}
      {scrollToTop && <ScrollToTop scrollTo={scrollViewEl.current} />}
    </RNScrollView>
  )
}
