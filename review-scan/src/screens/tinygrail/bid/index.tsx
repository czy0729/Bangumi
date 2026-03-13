/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-16 17:41:15
 */
import React from 'react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import TinygrailPage from '@tinygrail/_/page'
import { NavigationProps } from '@types'
import Tabs from './component/tabs'
import Header from './header'
import { useTinygrailBidPage } from './hooks'

/** 我的委托 */
const TinygrailBid = (props: NavigationProps) => {
  const { id } = useTinygrailBidPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-bid'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <Tabs />
        </TinygrailPage>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailBid
