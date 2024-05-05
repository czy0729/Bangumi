/*
 * @Author: czy0729
 * @Date: 2019-06-24 19:34:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-04 22:35:07
 */
import React from 'react'
import { Component, Page } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import List from './component/list'
import Pagination from './component/pagination'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 二次元资讯 */
const Anitama = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-anitama'>
      <Header />
      <Page
        style={_.select(_.container.bg, _.container.plain)}
        loaded={$.state._loaded && $.state.show}
      >
        <List />
        <Pagination />
      </Page>
    </Component>
  ))
}

export default ic(Store, Anitama)
