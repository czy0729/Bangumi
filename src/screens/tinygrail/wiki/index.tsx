/*
 * @Author: czy0729
 * @Date: 2025-05-12 15:50:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-15 07:20:45
 */
import React, { useCallback, useRef, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Component, Page } from '@components'
import { _ } from '@stores'
import { feedback, scrollToView } from '@utils'
import { useObserver } from '@utils/hooks'
import Menu from './component/menu'
import Scroll from './component/scroll'
import Header from './header'

/** 小圣杯游戏指南 */
const TinygrailWiki = () => {
  const scrollViewRef = useRef<ScrollView>(null)
  const itemRefs = useRef<Record<string, View>>({})
  const [show, setShow] = useState(false)

  const handleForwardRef = useCallback((_: any, scrollView: ScrollView) => {
    scrollViewRef.current = scrollView
  }, [])
  const handleForwardItemRef = useCallback((ref: View, title: string) => {
    itemRefs.current[title] = ref
  }, [])

  const handleScrollTo = useCallback((title: string) => {
    scrollToView(itemRefs.current[title], scrollViewRef.current, () => {
      feedback(true)
    })
  }, [])

  return useObserver(() => (
    <Component id='screen-tinygrail-wiki'>
      <Page style={_.container.header}>
        <Scroll forwardRef={handleForwardRef} forwardItemRef={handleForwardItemRef} />
        <Menu show={show} onToggle={setShow} onScrollTo={handleScrollTo} />
      </Page>
      <Header onToggle={setShow} />
    </Component>
  ))
}

export default TinygrailWiki
