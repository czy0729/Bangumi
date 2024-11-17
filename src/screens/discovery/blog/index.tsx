/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:02:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 09:34:46
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Heatmaps from './component/heatmaps'
import Tabs from './component/tabs'
import Header from './header'
import { useDiscoveryBlogPage } from './hooks'

/** 全站日志 */
const DiscoveryBlog = (props: NavigationProps) => {
  const { id, $ } = useDiscoveryBlogPage(props)

  return useObserver(() => (
    <Component id='screen-discovery-blog'>
      <StoreContext.Provider value={id}>
        <Header />
        <Page loaded={$.state._loaded}>
          <Tabs />
          <Heatmaps />
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default DiscoveryBlog
