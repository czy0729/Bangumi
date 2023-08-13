/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-13 22:24:55
 */
import React, { useEffect } from 'react'
import { Page, Track } from '@components'
import { TapListener } from '@_'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { uiStore } from '@stores'
import { ic } from '@utils/decorators'
import { useIsFocused, useRunAfter, useObserver } from '@utils/hooks'
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
      <TapListener>
        <Page>
          <Header />
          {$.state._loaded && <Tab />}
        </Page>
      </TapListener>
      <Track title='时间胶囊' hm={['timeline', 'Timeline']} />
      <Heatmaps />
    </>
  ))
}

export default ic(Store, Timeline)
