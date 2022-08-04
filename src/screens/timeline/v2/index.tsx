/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-04 16:43:25
 */
import React from 'react'
import { Page, Track } from '@components'
import { StatusBarEvents, NavigationBarEvents } from '@_'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Tab from './tab'
import Heatmaps from './heatmaps'
import Store from './store'

const Timeline = (props, { $, navigation }) => {
  useRunAfter(() => {
    $.init()

    navigation.addListener(`${EVENT_APP_TAB_PRESS}|Timeline`, () => {
      $.onRefreshThenScrollTop()
    })
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
