/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:13:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-28 04:32:30
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Layout from './component/layout'
import Pagination from './component/pagination'
import ToolBar from './component/tool-bar'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

const Rank = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-rank'>
      <Header />
      <Page>
        {$.state.fixed && <ToolBar />}
        {$.state._loaded && <Layout />}
        {$.state.fixedPagination && <Pagination />}
      </Page>
    </Component>
  ))
}

export default ic(Store, Rank)
