/*
 * @Author: czy0729
 * @Date: 2020-01-02 16:52:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:06:47
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Pagination from './component/pagination'
import ToolBar from './component/tool-bar'
import Header from './header'
import { useCatalogPage } from './hooks'

/** 目录 */
const Catalog = (props: NavigationProps) => {
  const { id, $ } = useCatalogPage(props)

  return useObserver(() => (
    <Component id='screen-catalog'>
      <StoreContext.Provider value={id}>
        <Header />
        <Page loaded={$.state._loaded}>
          {$.state.fixedFilter && <ToolBar />}
          <List />
          {$.state.fixedPagination && <Pagination />}
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default Catalog
