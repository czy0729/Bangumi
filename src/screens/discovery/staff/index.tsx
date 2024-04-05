/*
 * @Author: czy0729
 * @Date: 2021-04-15 19:50:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-05 13:02:25
 */
import React from 'react'
import { Component, Heatmap, Page } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 新番 */
const Staff = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-staff'>
      <Header />
      <Page>
        <List />
      </Page>
      <Heatmap bottom={_.bottom} id='新番' screen='Staff' />
    </Component>
  ))
}

export default ic(Store, Staff)
