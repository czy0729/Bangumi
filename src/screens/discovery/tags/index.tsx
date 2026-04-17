/*
 * @Author: czy0729
 * @Date: 2019-10-03 14:44:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-17 12:49:32
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import Extra from './component/extra'
import Tabs from './component/tabs'
import Header from './header'
import { useTagsPage } from './hooks'

import type { NavigationProps } from '@types'

/** 标签 */
function Tags(props: NavigationProps) {
  const { id, $ } = useTagsPage(props)

  return (
    <Component id='screen-tags'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <Tabs />
        </Page>
        <Extra />
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Tags)
