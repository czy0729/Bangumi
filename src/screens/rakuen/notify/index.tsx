/*
 * @Author: czy0729
 * @Date: 2019-05-21 04:14:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 07:51:50
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import Heatmaps from './component/heatmaps'
import Tabs from './component/tabs'
import Header from './header'
import { useNotifyPage } from './hooks'
import Store from './store'
import { Ctx } from './types'

const Notify = (props, context: Ctx) => {
  useNotifyPage(context)

  const { $ } = context
  return useObserver(() => (
    <Component id='screen-notify'>
      <Header />
      <Page loaded={$.state._loaded}>
        <Tabs />
      </Page>
      <Heatmaps />
    </Component>
  ))
}

export default ic(Store, Notify)
