/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:56:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-10 18:38:52
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Page } from '@components'
import { TapListener } from '@_'
import { StoreContext } from '@stores'
import Extra from './component/extra'
import Tab from './component/tab'
import Header from './header'
import { useTimelinePage } from './hooks'

import type { NavigationProps } from '@types'

/** 时间胶囊 */
function Timeline(props: NavigationProps) {
  const { id, $ } = useTimelinePage(props)

  return (
    <Component id='screen-timeline'>
      <StoreContext.Provider value={id}>
        <TapListener>
          <Page>
            <Header />
            {$.state._loaded && <Tab />}
          </Page>
        </TapListener>
        <Extra />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Timeline)
