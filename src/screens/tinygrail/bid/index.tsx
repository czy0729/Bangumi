/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:12:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-28 06:06:57
 */
import { observer } from 'mobx-react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import TinygrailPage from '@tinygrail/_/page'
import Tabs from './component/tabs'
import Header from './header'
import { useTinygrailBidPage } from './hooks'

import type { NavigationProps } from '@types'

/** 我的委托 */
function TinygrailBid(props: NavigationProps) {
  const { id } = useTinygrailBidPage(props)

  return (
    <Component id='screen-tinygrail-bid'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <Tabs />
        </TinygrailPage>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(TinygrailBid)
