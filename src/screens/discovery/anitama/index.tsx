/*
 * @Author: czy0729
 * @Date: 2019-06-24 19:34:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 06:11:39
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Pagination from './component/pagination'
import Header from './header'
import { useAnitamaPage } from './hooks'

import type { NavigationProps } from '@types'

/** 二次元资讯 */
const Anitama = (props: NavigationProps) => {
  const { id, $ } = useAnitamaPage(props)

  return useObserver(() => (
    <Component id='screen-anitama'>
      <StoreContext.Provider value={id}>
        <Page
          style={_.select(_.container.bg, _.container.plain)}
          loaded={$.state._loaded}
          loading={!$.state.show}
        >
          <HeaderPlaceholder />
          <List />
          <Pagination />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Anitama
