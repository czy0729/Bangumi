/*
 * @Author: czy0729
 * @Date: 2020-03-08 20:39:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-27 05:10:54
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import TinygrailPage from '@tinygrail/_/page'
import List from './component/list'
import ToolBar from './component/tool-bar'
import Header from './header'
import { useTinygrailTopWeekPage } from './hooks'

import type { NavigationProps } from '@types'

/** 每周萌王 */
function TinygrailTopWeek(props: NavigationProps) {
  const { id } = useTinygrailTopWeekPage(props)

  return (
    <Component id='screen-tinygrail-top-week'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <ToolBar />
          <List />
        </TinygrailPage>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(TinygrailTopWeek)
