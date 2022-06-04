/*
 * @Author: czy0729
 * @Date: 2020-01-02 16:52:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-04 23:05:24
 */
import React from 'react'
import { Header, Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Type from './type'
import List from './list'
import Pagination from './pagination'
import Store from './store'

const Catalog = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header
        title='目录'
        hm={['discovery/catalog', 'Catalog']}
        headerRight={() => <Type $={$} />}
      />
      <Page loaded={$.state._loaded}>
        <List />
        <Pagination />
      </Page>
    </>
  ))
}

export default ic(Store, Catalog)
