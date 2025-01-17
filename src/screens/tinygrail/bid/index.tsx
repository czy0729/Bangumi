/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-16 17:41:15
 */
import React from 'react'
import { Component, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Tabs from './component/tabs'
import Header from './header'
import { useTinygrailBidPage } from './hooks'

/** 我的委托 */
const TinygrailBid = (props: NavigationProps) => {
  const { id, $ } = useTinygrailBidPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-bid'>
      <StoreContext.Provider value={id}>
        <Page
          style={_.container.tinygrail}
          loaded={$.state._loaded}
          loadingColor={_.colorTinygrailText}
        >
          <Tabs />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailBid
