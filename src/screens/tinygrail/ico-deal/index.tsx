/*
 * @Author: czy0729
 * @Date: 2019-09-20 00:39:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:30:13
 */
import { observer } from 'mobx-react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import TinygrailPage from '@tinygrail/_/page'
import Scroll from './component/scroll'
import Header from './header'
import { useTinygrailICODealPage } from './hooks'

import type { NavigationProps } from '@types'

/** ICO 详情 */
function TinygrailICODeal(props: NavigationProps) {
  const { id } = useTinygrailICODealPage(props)

  return (
    <Component id='screen-tinygrail-ico-deal'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <Scroll />
        </TinygrailPage>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(TinygrailICODeal)
