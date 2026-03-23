/*
 * @Author: czy0729
 * @Date: 2019-05-21 04:14:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 07:51:50
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import Heatmaps from './component/heatmaps'
import Tabs from './component/tabs'
import Header from './header'
import { useNotifyPage } from './hooks'

import type { NavigationProps } from '@types'

/** 电波提醒 */
function Notify(props: NavigationProps) {
  const { id, $ } = useNotifyPage(props)

  return (
    <Component id='screen-notify'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <Tabs />
        </Page>
        <Header />
        <Heatmaps />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Notify)
