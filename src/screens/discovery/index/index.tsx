/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-10 11:03:41
 */
import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { Page, StatusBarEvents, Track, Heatmap } from '@components'
import { _ } from '@stores'
import { androidDayNightToggle } from '@utils'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import List from './list'
import LinkModal from './link-modal'
import Store from './store'
import { Ctx } from './types'

const title = '发现'

const Discovery = ({ isFocused }, { $, navigation }: Ctx) => {
  useRunAfter(() => {
    $.init()

    navigation.addListener(`${EVENT_APP_TAB_PRESS}|Discovery`, () => {
      $.onRefreshThenScrollTop()
    })
  })

  useFocusEffect(() => {
    androidDayNightToggle(_.isDark)
  })

  return useObserver(() => (
    <Page>
      <StatusBarEvents backgroundColor='transparent' />
      <List isFocused={isFocused} />
      <LinkModal />
      <Track title={title} hm={['discovery', 'Discovery']} />
      <Heatmap bottom={_.bottom} id='发现' screen='Discovery' />
    </Page>
  ))
}

export default ic(Store, Discovery, {
  listenIsFocused: true
})
