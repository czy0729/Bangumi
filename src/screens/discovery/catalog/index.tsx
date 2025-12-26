/*
 * @Author: czy0729
 * @Date: 2020-01-02 16:52:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-22 19:09:53
 */
import React from 'react'
import { Component, Empty, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import { useCatalogPage } from './hooks'

import type { NavigationProps } from '@types'

/** 目录 */
const Catalog = (props: NavigationProps) => {
  const { id, $ } = useCatalogPage(props)

  return useObserver(() => (
    <Component id='screen-catalog'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded} loading={!$.catalog._loaded}>
          <HeaderPlaceholder />
          {$.isLimit ? <Empty text='此功能仅对正常注册用户开放' /> : <List />}
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Catalog
