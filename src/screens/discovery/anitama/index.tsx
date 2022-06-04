/*
 * @Author: czy0729
 * @Date: 2019-06-24 19:34:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-05 06:06:01
 */
import React from 'react'
import { Page } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import List from './list'
import Pagination from './pagination'
import Store from './store'

const Anitama = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header />
      <Page
        style={_.select(_.container.bg, _.container.plain)}
        loaded={$.state._loaded}
      >
        <List />
        <Pagination />
      </Page>
    </>
  ))
}

export default ic(Store, Anitama)
