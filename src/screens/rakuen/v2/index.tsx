/*
 * @Author: czy0729
 * @Date: 2019-04-26 13:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 02:53:09
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import Extra from './component/extra'
import Tab from './component/tab'
import Header from './header'
import { useRakuenPage } from './hooks'

import type { NavigationProps } from '@types'

/** 超展开 */
function Rakuen(props: NavigationProps) {
  const { id } = useRakuenPage(props)

  return (
    <Component id='screen-rakuen'>
      <StoreContext.Provider value={id}>
        <Page>
          <Header />
          <Tab />
        </Page>
        <Extra />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Rakuen)
