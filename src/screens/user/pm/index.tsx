/*
 * @Author: czy0729
 * @Date: 2020-02-02 05:03:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-06 04:08:22
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { _, StoreContext } from '@stores'
import Heatmaps from './component/heatmaps'
import Scroll from './component/scroll'
import Header from './header'
import { usePMPage } from './hooks'

import type { NavigationProps } from '@types'

/** 短信 */
function ScreenPM(props: NavigationProps) {
  const { id } = usePMPage(props)

  return (
    <Component id='screen-pm'>
      <StoreContext.Provider value={id}>
        <Page style={_.container.screen}>
          <HeaderPlaceholder />
          <Scroll />
        </Page>
        <Header />
        <Heatmaps />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(ScreenPM)
