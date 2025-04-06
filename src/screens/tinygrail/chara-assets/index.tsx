/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-06 08:27:00
 */
import React from 'react'
import { Component, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Modal from './component/modal'
import Tabs from './component/tabs'
import Header from './header'
import { useTinygrailCharaAssetsPage } from './hooks'

/** 我的持仓 */
const TinygrailCharaAssets = (props: NavigationProps) => {
  const { id, $ } = useTinygrailCharaAssetsPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-chara-assets'>
      <StoreContext.Provider value={id}>
        <Page
          style={_.container.tinygrail}
          loaded={$.state._loaded}
          loadingColor={_.colorTinygrailText}
        >
          <Tabs />
          <Modal />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailCharaAssets
