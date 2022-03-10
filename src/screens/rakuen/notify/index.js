/*
 * @Author: czy0729
 * @Date: 2019-05-21 04:14:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-10 22:01:16
 */
import React from 'react'
import { Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Tabs from './tabs'
import Heatmaps from './heatmaps'
import Store from './store'

const Notify = (props, { $ }) => {
  useRunAfter(async () => {
    await $.init()
    $.doClearNotify()
  })

  return useObserver(() => (
    <>
      <Header />
      <Page loaded={$.state._loaded}>
        <Tabs />
      </Page>
      <Heatmaps />
    </>
  ))
}

export default ic(Store, Notify)
