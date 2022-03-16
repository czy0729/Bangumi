/*
 * @Author: czy0729
 * @Date: 2019-04-26 13:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 18:16:30
 */
import React from 'react'
import { Page, Track } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import { StatusBarEvents, NavigationBarEvents } from '@screens/_'
import Header from './header'
import Tab from './tab'
import Heatmaps from './heapmaps'
import Store from './store'

const Rakuen = (props, { $ }) => {
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
      <Track title='超展开' hm={['rakuen', 'Rakuen']} />
      <Heatmaps />
    </>
  ))
}

export default ic(Store, Rakuen)
