/*
 * @Author: czy0729
 * @Date: 2019-09-10 20:46:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 11:10:30
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import TinygrailPage from '@tinygrail/_/page'
import Scroll from './component/scroll'
import Header from './header'
import { useTinygrailDealPage } from './hooks'

import type { NavigationProps } from '@types'

/** 交易 */
function TinygrailDeal(props: NavigationProps) {
  const { id } = useTinygrailDealPage(props)

  return (
    <Component id='screen-tinygrail-deal'>
      <StoreContext.Provider value={id}>
        <TinygrailPage header={false}>
          <Header />
          <Scroll />
        </TinygrailPage>
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(TinygrailDeal)
