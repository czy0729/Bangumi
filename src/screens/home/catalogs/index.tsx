/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:54:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-17 21:37:58
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Extra from './component/extra'
import List from './component/list'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 条目目录 */
const Catalogs = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-subject-catalogs'>
      <Header />
      <Page loaded={$.list._loaded}>
        <List />
      </Page>
      <Extra />
    </Component>
  ))
}

export default ic(Store, Catalogs)
