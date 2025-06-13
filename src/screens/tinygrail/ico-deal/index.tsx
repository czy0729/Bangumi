/*
 * @Author: czy0729
 * @Date: 2019-09-20 00:39:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-14 01:37:23
 */
import React from 'react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import TinygrailPage from '@tinygrail/_/page'
import { NavigationProps } from '@types'
import Scroll from './component/scroll'
import Header from './header'
import { useTinygrailICODealPage } from './hooks'

/** ICO 详情 */
const TinygrailICODeal = (props: NavigationProps) => {
  const { id } = useTinygrailICODealPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-ico-deal'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <Scroll />
        </TinygrailPage>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailICODeal
