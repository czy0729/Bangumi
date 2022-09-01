/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:02:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 13:47:55
 */
import React from 'react'
import { Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Tabs from './tabs'
import Heatmaps from './heatmaps'
import Store from './store'
import { Ctx } from './types'

const DiscoveryBlog = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header />
      <Page loaded={$.state._loaded}>
        <Tabs />
        <Heatmaps />
      </Page>
    </>
  ))
}

export default ic(Store, DiscoveryBlog)
