/*
 * @Author: czy0729
 * @Date: 2019-04-26 13:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-04 16:46:50
 */
import React from 'react'
import { Page, Track } from '@components'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import { StatusBarEvents, NavigationBarEvents } from '@_'
import Header from './header'
import Tab from './tab'
import Heatmaps from './heapmaps'
import Store from './store'

const Rakuen = (props, { $, navigation }) => {
  useRunAfter(() => {
    $.init()

    navigation.addListener(`${EVENT_APP_TAB_PRESS}|Rakuen`, () => {
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
      <Track title='超展开' hm={['rakuen', 'Rakuen']} />
      <Heatmaps />
    </>
  ))
}

export default ic(Store, Rakuen)
