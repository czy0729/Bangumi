/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 15:41:45
 */
import React from 'react'
import { Component, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Tabs from './component/tabs'
import Header from './header'
import { useTinygrailOverviewPage } from './hooks'

/** 热门榜单 */
const TinygrailOverview = (props: NavigationProps) => {
  const { id, $ } = useTinygrailOverviewPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-overview'>
      <StoreContext.Provider value={id}>
        <Header />
        <Page
          style={_.container.tinygrail}
          loadingColor={_.colorTinygrailText}
          loaded={$.state._loaded}
        >
          <Tabs />
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailOverview
