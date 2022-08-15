/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-16 04:14:17
 */
import React, { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { Page, Track } from '@components'
import { StatusBarEvents, NavigationBarEvents, TapListener } from '@_'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { uiStore } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Tab from './tab'
import Heatmaps from './heatmaps'
import Store from './store'
import { Ctx } from './types'

const Timeline = (props, { $, navigation }: Ctx) => {
  const isFocused = useIsFocused()

  useRunAfter(() => {
    $.init()

    navigation.addListener(`${EVENT_APP_TAB_PRESS}|Timeline`, () => {
      $.onRefreshThenScrollTop()
    })
  })

  useEffect(() => {
    if (!isFocused) uiStore.closePopableSubject()
  }, [isFocused])

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
