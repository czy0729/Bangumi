/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:13:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-07 16:53:45
 */
import React from 'react'
import { Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import ToolBar from './tool-bar'
import List from './list'
import Pagination from './pagination'
import Store from './store'
import { Ctx } from './types'

const Rank = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const { _loaded, fixed, fixedPagination } = $.state
    return (
      <>
        <Header />
        <Page>
          {fixed && <ToolBar />}
          {_loaded && <List />}
          {fixedPagination && <Pagination />}
        </Page>
      </>
    )
  })
}

export default ic(Store, Rank)
