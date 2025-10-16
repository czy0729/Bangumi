/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-16 20:10:39
 */
import React from 'react'
import './styles'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Bottom from './component/bottom'
import Extra from './component/extra'
import List from './component/list'
import TouchScroll from './component/touch-scroll'
import Header from './header'
import { useTopicPage } from './hooks'

import type { NavigationProps } from '@types'

/** 帖子 */
const Topic = (props: NavigationProps) => {
  const {
    id,
    scrollViewRef,
    fixedTextareaRef,
    handleDirect,
    handleFloorPress,
    handleScrollToIndexFailed,
    handleScrollTo,
    handleScrollToTop,
    handleShowFixedTextarea
  } = useTopicPage(props)

  return useObserver(() => (
    <Component id='screen-topic'>
      <StoreContext.Provider value={id}>
        <Page statusBarEvent={false}>
          <List
            forwardRef={scrollViewRef}
            onScrollTo={handleScrollTo}
            onShowFixedTextarea={handleShowFixedTextarea}
            onScrollToIndexFailed={handleScrollToIndexFailed}
          />
          <TouchScroll onPress={handleFloorPress} />
        </Page>
        <Header onScrollToTop={handleScrollToTop} />
        <Bottom fixedTextareaRef={fixedTextareaRef} onDirect={handleDirect} />
        <Extra />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Topic
