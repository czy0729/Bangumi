/*
 * @Author: czy0729
 * @Date: 2019-05-21 04:14:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 04:32:16
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Heatmaps from './component/heatmaps'
import Tabs from './component/tabs'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

const Notify = (props, { $ }: Ctx) => {
  useRunAfter(async () => {
    await $.init()
    $.doClearNotify()
  })

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
