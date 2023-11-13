/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:54:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-12 07:16:54
 */
import React from 'react'
import { Page, Heatmap, Component } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const Catalogs = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-subject-catalogs'>
      <Header />
      <Page loaded={$.list._loaded}>
        <List />
        <Heatmap bottom={_.bottom} id='条目目录' screen='SubjectCatalogs' />
      </Page>
    </Component>
  ))
}

export default ic(Store, Catalogs)
