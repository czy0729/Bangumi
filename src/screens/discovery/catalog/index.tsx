/*
 * @Author: czy0729
 * @Date: 2020-01-02 16:52:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-30 19:17:00
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import List from './component/list'
import Pagination from './component/pagination'
import ToolBar from './component/tool-bar'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 目录 */
const Catalog = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-catalog'>
      <Header />
      <Page loaded={$.state._loaded}>
        {$.state.fixedFilter && <ToolBar />}
        <List />
        {$.state.fixedPagination && <Pagination />}
      </Page>
    </Component>
  ))
}

export default ic(Store, Catalog)
