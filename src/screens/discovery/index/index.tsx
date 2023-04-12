/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:09:36
 */
import React from 'react'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { Page, StatusBarEvents, Track, Heatmap } from '@components'
import { _, systemStore } from '@stores'
import { androidDayNightToggle } from '@utils'
import { ic } from '@utils/decorators'
import { useFocusEffect, useRunAfter, useObserver } from '@utils/hooks'
import List from './list'
import LinkModal from './link-modal'
import Mesume from './mesume'
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

  return useObserver(() => {
    const { live2D } = systemStore.setting
    return (
      <Page>
        <StatusBarEvents backgroundColor='transparent' />
        <List isFocused={isFocused} />
        {live2D && <Mesume dragging={$.state.dragging} />}
        <LinkModal />
        <Track title={title} hm={['discovery', 'Discovery']} />
        <Heatmap bottom={_.bottom} id='发现' screen='Discovery' />
      </Page>
    )
  })
}

export default ic(Store, Discovery, {
  listenIsFocused: true
})
