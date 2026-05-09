/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 20:40:59
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import List from './component/list'
import ToolBar from './component/tool-bar'
import Header from './header'
import { useVoicesPage } from './hooks'

import type { NavigationProps } from '@types'

/** 人物的角色 */
function Voices(props: NavigationProps) {
  const { id, $ } = useVoicesPage(props)

  return (
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
  )
}

export default observer(Voices)
