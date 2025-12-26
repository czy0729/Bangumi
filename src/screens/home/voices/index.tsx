/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-25 05:23:43
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import ToolBar from './component/tool-bar'
import Header from './header'
import { useVoicesPage } from './hooks'

import type { NavigationProps } from '@types'

/** 人物的角色 */
const Voices = (props: NavigationProps) => {
  const { id, $ } = useVoicesPage(props)

  return useObserver(() => (
    <Component id='screen-voices'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded} loading={$.loading}>
          <HeaderPlaceholder />
          <ToolBar />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Voices
