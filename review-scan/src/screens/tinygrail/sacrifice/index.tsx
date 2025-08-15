/*
 * @Author: czy0729
 * @Date: 2019-11-17 04:20:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-31 22:24:24
 */
import React from 'react'
import { Component, Flex } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import TinygrailPage from '@tinygrail/_/page'
import TinygrailScrollView from '@tinygrail/_/scroll-view'
import { NavigationProps } from '@types'
import Auction from './component/auction'
import AuctionList from './component/auction-list'
import Info from './component/info'
import Items from './component/items'
import Refine from './component/refine'
import Sacrifice from './component/sacrifice'
import Starforces from './component/starforces'
import Temples from './component/temples'
import Users from './component/users'
import Header from './header'
import { useTinygrailSacrificePage } from './hooks'

/** 资产重组 */
const TinygrailSacrifice = (props: NavigationProps) => {
  const { id, $ } = useTinygrailSacrificePage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-sacrifice'>
      <StoreContext.Provider value={id}>
        <TinygrailPage header={false}>
          <TinygrailScrollView contentContainerStyle={_.container.page} onRefresh={$.refreshAll}>
            <Info />
            <Flex wrap='wrap'>
              <Sacrifice />
              <Starforces />
              <Refine />
              <Items />
              <Auction />
            </Flex>
            <AuctionList />
            <Temples />
            <Users />
          </TinygrailScrollView>
        </TinygrailPage>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailSacrifice
