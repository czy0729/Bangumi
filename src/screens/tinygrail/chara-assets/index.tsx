/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-06 08:27:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import TinygrailPage from '@tinygrail/_/page'
import Modal from './component/modal'
import Tabs from './component/tabs'
import Header from './header'
import { useTinygrailCharaAssetsPage } from './hooks'

import type { NavigationProps } from '@types'

/** 我的持仓 */
function TinygrailCharaAssets(props: NavigationProps) {
  const { id } = useTinygrailCharaAssetsPage(props)

  return (
    <Component id='screen-tinygrail-chara-assets'>
      <StoreContext.Provider value={id}>
        <TinygrailPage header={false}>
          <Tabs />
          <Modal />
        </TinygrailPage>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(TinygrailCharaAssets)
