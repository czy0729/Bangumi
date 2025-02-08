/*
 * @Author: czy0729
 * @Date: 2019-04-29 19:28:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-07 07:21:34
 */
import React from 'react'
import './styles'
import { Component, Page } from '@components'
import { TapListener } from '@_'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Bottom from './component/bottom'
import Extra from './component/extra'
import List from './component/list'
import TouchScroll from './component/touch-scroll'
import Header from './header'
import { useTopicPage } from './hooks'

/** 帖子 */
const Topic = (props: NavigationProps) => {
  const {
    id,
    forwardRef,
    fixedTextareaRef,
    onFloorPress,
    onShowFixedTextarea,
    onScrollToIndexFailed,
    onDirect
  } = useTopicPage(props)

  return useObserver(() => (
    <Component id='screen-topic'>
      <StoreContext.Provider value={id}>
        <TapListener>
          <Page statusBarEvent={false}>
            <List
              forwardRef={forwardRef}
              onScrollToIndexFailed={onScrollToIndexFailed}
              onShowFixedTextarea={onShowFixedTextarea}
            />
            <TouchScroll onPress={onFloorPress} />
          </Page>
        </TapListener>
        <Header />
        <Bottom fixedTextareaRef={fixedTextareaRef} onDirect={onDirect} />
        <Extra />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Topic
