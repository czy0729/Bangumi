/*
 * @Author: czy0729
 * @Date: 2020-03-05 17:59:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-02 05:56:26
 */
import React from 'react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import TinygrailPage from '@tinygrail/_/page'
import { NavigationProps } from '@types'
import List from './component/list'
import Modal from './component/modal'
import Header from './header'
import { useTinygrailItemsPage } from './hooks'

/** 我的道具 */
const TinygrailItems = (props: NavigationProps) => {
  const { id } = useTinygrailItemsPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-items'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <List />
          <Modal />
        </TinygrailPage>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailItems
