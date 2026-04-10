/*
 * @Author: czy0729
 * @Date: 2020-01-05 21:50:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-10 00:04:37
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import List from './component/list'
import Modal from './component/modal'
import Tips from './component/tips'
import Header from './header'
import { useCatalogDetailPage } from './hooks'

import type { NavigationProps } from '@types'

/** 目录详情 */
function CatalogDetail(props: NavigationProps) {
  const { id } = useCatalogDetailPage(props)

  return (
    <Component id='screen-catalog-detail'>
      <StoreContext.Provider value={id}>
        <Page statusBarEvent={false}>
          <List />
          <Tips />
        </Page>
        <Header />
        <Modal />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(CatalogDetail)
