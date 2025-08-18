/*
 * @Author: czy0729
 * @Date: 2020-03-08 20:39:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-27 05:10:54
 */
import React from 'react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import TinygrailPage from '@tinygrail/_/page'
import { NavigationProps } from '@types'
import List from './component/list'
import ToolBar from './component/tool-bar'
import Header from './header'
import { useTinygrailTopWeekPage } from './hooks'

/** 每周萌王 */
const TinygrailTopWeek = (props: NavigationProps) => {
  const { id } = useTinygrailTopWeekPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-top-week'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <ToolBar />
          <List />
        </TinygrailPage>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailTopWeek
