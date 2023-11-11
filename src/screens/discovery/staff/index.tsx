/*
 * @Author: czy0729
 * @Date: 2021-04-15 19:50:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 14:01:27
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

const Staff = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-staff'>
      <Header />
      <Page>
        <List />
        <Heatmap bottom={_.bottom} id='新番' screen='Staff' />
      </Page>
    </Component>
  ))
}

export default ic(Store, Staff)
