/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 00:26:34
 */
import React from 'react'
import { Page, UM } from '@components'
import { StatusBarEvents, NavigationBarEvents } from '@_'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import { hm } from '@utils/fetch'
import Header from './header'
import Tab from './tab'
import Heatmaps from './heatmaps'
import Store from './store'

const Timeline = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
    hm('timeline', 'Timeline')
  })

  return useObserver(() => (
    <>
      <Page>
        <Header />
        {$.state._loaded && <Tab />}
      </Page>
      <StatusBarEvents backgroundColor='transparent' />
      <NavigationBarEvents />
      <UM screen='时间胶囊' />
      <Heatmaps />
    </>
  ))
}

export default ic(Store, Timeline)
