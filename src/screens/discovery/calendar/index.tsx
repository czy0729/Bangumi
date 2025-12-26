/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-21 22:53:53
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import ToolBar from './component/tool-bar'
import Header from './header'
import { useCalendarPage } from './hooks'

import type { NavigationProps } from '@types'

/** 每日放送 */
const Calendar = (props: NavigationProps) => {
  const { id, $ } = useCalendarPage(props)

  return useObserver(() => (
    <Component id='screen-calendar'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded} loading={!$.calendar._loaded}>
          <HeaderPlaceholder style={_.mt.xs} />
          <ToolBar />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Calendar
