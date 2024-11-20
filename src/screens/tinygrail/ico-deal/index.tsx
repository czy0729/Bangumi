/*
 * @Author: czy0729
 * @Date: 2019-09-20 00:39:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 12:08:59
 */
import React from 'react'
import { Component, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Scroll from './component/scroll'
import Header from './header'
import { useTinygrailICODealPage } from './hooks'

/** ICO 详情 */
const TinygrailICODeal = (props: NavigationProps) => {
  const { id, $ } = useTinygrailICODealPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-ico-deal'>
      <StoreContext.Provider value={id}>
        <Header />
        <Page style={_.container.tinygrail}>
          <Scroll onRefresh={$.refresh} />
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailICODeal
