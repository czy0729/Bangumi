/*
 * @Author: czy0729
 * @Date: 2019-11-17 04:20:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-19 11:04:30
 */
import React from 'react'
import { Page } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import ScrollView from '@tinygrail/_/scroll-view'
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
import Store from './store'
import { Ctx } from './types'

/** 资产重组 */
const TinygrailSacrifice = (props, context: Ctx) => {
  useTinygrailSacrificePage(context)

  const { $ } = context
  return useObserver(() => (
    <>
      <Header />
      <Page style={_.container.tinygrail}>
        <ScrollView contentContainerStyle={_.container.bottom} onRefresh={$.refresh}>
          <Info />
          <Sacrifice />
          <Starforces />
          <Refine />
          <Items />
          <Auction />
          <AuctionList />
          <Temples />
          <Users />
        </ScrollView>
      </Page>
    </>
  ))
}

export default ic(Store, TinygrailSacrifice)
