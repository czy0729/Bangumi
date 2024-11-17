/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 01:16:57
 */
import React from 'react'
import { Component, Loading, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import ToolBar from './component/tool-bar'
import Header from './header'
import { useCalendarPage } from './hooks'

/** 每日放送 */
const Calendar = (props: NavigationProps) => {
  const { id, $ } = useCalendarPage(props)

  return useObserver(() => (
    <Component id='screen-calendar'>
      <StoreContext.Provider value={id}>
        <Header />
        <Page>
          <ToolBar />
          {$.state._loaded && $.calendar._loaded ? <List /> : <Loading />}
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default Calendar
