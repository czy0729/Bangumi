/*
 * @Author: czy0729
 * @Date: 2021-04-15 19:50:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 01:35:24
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import { useStaffPage } from './hooks'

import type { NavigationProps } from '@types'

/** 新番 */
const Staff = (props: NavigationProps) => {
  const { $, id } = useStaffPage(props)

  return useObserver(() => (
    <Component id='screen-staff'>
      <StoreContext.Provider value={id}>
        <Page loading={!$.catalogs._loaded}>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Staff
