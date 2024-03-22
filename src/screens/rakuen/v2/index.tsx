/*
 * @Author: czy0729
 * @Date: 2019-04-26 13:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-22 06:52:02
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import Extra from './component/extra'
import Tab from './component/tab'
import Header from './header'
import { useRakuenPage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** 超展开 */
const Rakuen = (props, context: Ctx) => {
  useRakuenPage(context)

  return useObserver(() => (
    <Component id='screen-rakuen'>
      <Page>
        <Header />
        <Tab />
      </Page>
      <Extra />
    </Component>
  ))
}

export default ic(Store, Rakuen)
