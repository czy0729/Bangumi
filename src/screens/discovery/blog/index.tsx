/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:02:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 05:54:10
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import Heatmaps from './component/heatmaps'
import Tabs from './component/tabs'
import Header from './header'
import { useDiscoveryBlogPage } from './hooks'

import type { NavigationProps } from '@types'

/** 全站日志 */
function DiscoveryBlog(props: NavigationProps) {
  const { id, $ } = useDiscoveryBlogPage(props)

  return (
    <Component id='screen-discovery-blog'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <Tabs />
          <Heatmaps />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(DiscoveryBlog)
