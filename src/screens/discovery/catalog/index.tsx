/*
 * @Author: czy0729
 * @Date: 2020-01-02 16:52:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-06 21:31:38
 */
import React from 'react'
import { Header, Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Type from './type'
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
      <>
        <Header
          title='目录'
          headerTitleAlign='left'
          hm={['discovery/catalog', 'Catalog']}
          headerRight={() => <Type $={$} />}
        />
        <Page loaded={$.state._loaded}>
          {fixedFilter && <Filter />}
          <List />
          {fixedPagination && <Pagination />}
        </Page>
      </>
    )
  })
}

export default ic(Store, Catalog)
