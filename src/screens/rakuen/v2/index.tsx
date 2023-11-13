/*
 * @Author: czy0729
 * @Date: 2019-04-26 13:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 20:38:15
 */
import React from 'react'
import { Component, Page, Track } from '@components'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Tab from './tab'
import Heatmaps from './heapmaps'
import Store from './store'
import { Ctx } from './types'

const Rakuen = (props, { $, navigation }: Ctx) => {
  useRunAfter(() => {
    $.init()

    navigation.addListener(`${EVENT_APP_TAB_PRESS}|Rakuen`, () => {
      $.onRefreshThenScrollTop()
    })
  })

  return useObserver(() => (
    <Component id='screen-rakuen'>
      <Page>
        <Header />
        <Tab />
      </Page>
      <Track title='超展开' hm={['rakuen', 'Rakuen']} />
      <Heatmaps />
    </Component>
  ))
}

export default ic(Store, Rakuen)
