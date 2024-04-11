/*
 * @Author: czy0729
 * @Date: 2019-07-24 10:19:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-12 03:16:42
 */
import React from 'react'
import { Component, Heatmap, Page } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Filter from './component/filter'
import List from './component/list'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 好友 */
const Friends = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-friends'>
      <Header />
      <Page>
        <Filter />
        <List />
      </Page>
      <Heatmap bottom={_.bottom + _.sm} id='好友' screen='Friends' />
    </Component>
  ))
}

export default ic(Store, Friends)
