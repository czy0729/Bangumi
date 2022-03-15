/*
 * @Author: czy0729
 * @Date: 2019-04-26 13:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 23:29:55
 */
import React from 'react'
import { Page, UM } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import { StatusBarEvents, NavigationBarEvents } from '@screens/_'
import { hm } from '@utils/fetch'
import Header from './header'
import Tab from './tab'
import Heatmaps from './heapmaps'
import Store from './store'

const Rakuen = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
    hm('rakuen', 'Rakuen')
  })

  return useObserver(() => (
    <>
      <Page>
        <Header />
        {$.state._loaded && <Tab />}
      </Page>
      <StatusBarEvents backgroundColor='transparent' />
      <NavigationBarEvents />
      <UM screen='超展开' />
      <Heatmaps />
    </>
  ))
}

export default ic(Store, Rakuen)
