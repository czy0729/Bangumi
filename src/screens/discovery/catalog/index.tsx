/*
 * @Author: czy0729
 * @Date: 2020-01-02 16:52:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 15:35:13
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Filter from './component/filter'
import List from './component/list'
import Pagination from './component/pagination'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

const Catalog = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-catalog'>
      <Header />
      <Page loaded={$.state._loaded}>
        {$.state.fixedFilter && <Filter />}
        <List />
        {$.state.fixedPagination && <Pagination />}
      </Page>
    </Component>
  ))
}

export default ic(Store, Catalog)
