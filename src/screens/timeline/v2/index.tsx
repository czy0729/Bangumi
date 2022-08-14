/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-14 09:28:18
 */
import React from 'react'
import { Page, Track } from '@components'
import { StatusBarEvents, NavigationBarEvents, TapListener } from '@_'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Tab from './tab'
import Heatmaps from './heatmaps'
import Store from './store'
import { Ctx } from './types'

const Timeline = (props, { $, navigation }: Ctx) => {
  useRunAfter(() => {
    $.init()

    navigation.addListener(`${EVENT_APP_TAB_PRESS}|Timeline`, () => {
      $.onRefreshThenScrollTop()
    })
  })

  return useObserver(() => (
    <>
      <StatusBarEvents backgroundColor='transparent' />
      <TapListener>
        <Page>
          <Header />
          {$.state._loaded && <Tab />}
        </Page>
      </TapListener>
      <NavigationBarEvents />
      <Track title='时间胶囊' hm={['timeline', 'Timeline']} />
      <Heatmaps />
    </>
  ))
}

export default ic(Store, Timeline)
