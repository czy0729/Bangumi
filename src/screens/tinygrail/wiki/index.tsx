/*
 * @Author: czy0729
 * @Date: 2025-05-12 15:50:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:55:51
 */
import { useCallback, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { feedback, scrollToView } from '@utils'
import Menu from './component/menu'
import Scroll from './component/scroll'
import Header from './header'

import type { ScrollView, View } from 'react-native'

/** 小圣杯游戏指南 */
function TinygrailWiki() {
  const scrollViewRef = useRef<ScrollView>(null)
  const itemRefs = useRef<Record<string, View>>({})
  const [show, setShow] = useState(false)

  const handleForwardRef = useCallback((_, scrollView: ScrollView) => {
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

  return (
    <Component id='screen-tinygrail-wiki'>
      <Page>
        <HeaderPlaceholder />
        <Scroll forwardRef={handleForwardRef} forwardItemRef={handleForwardItemRef} />
        <Menu show={show} onToggle={setShow} onScrollTo={handleScrollTo} />
      </Page>
      <Header onToggle={setShow} />
    </Component>
  )
}

export default observer(TinygrailWiki)
