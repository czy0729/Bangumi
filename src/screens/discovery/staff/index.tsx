/*
 * @Author: czy0729
 * @Date: 2021-04-15 19:50:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-23 19:11:36
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import List from './component/list'
import Header from './header'
import { useStaffPage } from './hooks'

import type { NavigationProps } from '@types'

/** 新番 */
function Staff(props: NavigationProps) {
  const { $, id } = useStaffPage(props)

  return (
    <Component id='screen-staff'>
      <StoreContext.Provider value={id}>
        <Page loading={!$.catalogs._loaded}>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Staff)
