/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 18:23:10
 */
import React from 'react'
import { Page, Track } from '@components'
import { StatusBarEvents, NavigationBarEvents } from '@_'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Tab from './tab'
import Heatmaps from './heatmaps'
import Store from './store'

const Timeline = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <StatusBarEvents backgroundColor='transparent' />
      <Page>
        <Header />
        {$.state._loaded && <Tab />}
      </Page>
      <NavigationBarEvents />
      <Track title='时间胶囊' hm={['timeline', 'Timeline']} />
      <Heatmaps />
    </>
  ))
}

export default ic(Store, Timeline)
