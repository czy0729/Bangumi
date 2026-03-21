/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 15:53:05
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { _, StoreContext } from '@stores'
import List from './component/list'
import ToolBar from './component/tool-bar'
import Header from './header'
import { useCalendarPage } from './hooks'

import type { NavigationProps } from '@types'

/** 每日放送 */
function Calendar(props: NavigationProps) {
  const { id, $, handleForwardRef, handleScrollToOffset } = useCalendarPage(props)

  return (
    <Component id='screen-calendar'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded} loading={!$.calendar._loaded}>
          <HeaderPlaceholder style={_.mt.xs} />
          <ToolBar />
          <List forwardRef={handleForwardRef} />
        </Page>
        <Header onScrollToOffset={handleScrollToOffset} />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Calendar)
