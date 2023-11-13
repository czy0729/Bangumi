/*
 * @Author: czy0729
 * @Date: 2020-10-17 16:59:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-12 07:48:02
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

const Episodes = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-episodes'>
      <Header />
      <Page loaded={$.subject._loaded}>
        <List />
        <Heatmap bottom={_.bottom} id='章节' screen='Episodes' />
      </Page>
    </Component>
  ))
}

export default ic(Store, Episodes)
