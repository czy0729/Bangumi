/*
 * @Author: czy0729
 * @Date: 2020-01-02 16:52:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 15:45:01
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Filter from './filter'
import List from './list'
import Pagination from './pagination'
import Store from './store'
import { Ctx } from './types'

const Catalog = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const { fixedFilter, fixedPagination } = $.state
    return (
      <Component id='screen-catalog'>
        <Header />
        <Page loaded={$.state._loaded}>
          {fixedFilter && <Filter />}
          <List />
          {fixedPagination && <Pagination />}
        </Page>
      </Component>
    )
  })
}

export default ic(Store, Catalog)
