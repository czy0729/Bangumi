/*
 * @Author: czy0729
 * @Date: 2020-01-05 21:50:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:17:30
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Modal from './component/modal'
import Tips from './component/tips'
import Header from './header'
import { useCatalogDetailPage } from './hooks'

/** 目录详情 */
const CatalogDetail = (props: NavigationProps) => {
  const { id, fixed, handleScroll } = useCatalogDetailPage(props)

  return useObserver(() => (
    <Component id='screen-catalog-detail'>
      <StoreContext.Provider value={id}>
        <Page statusBarEvent={false}>
          <List onScroll={handleScroll} />
          <Tips />
        </Page>
        <Header fixed={fixed} />
        <Modal />
      </StoreContext.Provider>
    </Component>
  ))
}

export default CatalogDetail
