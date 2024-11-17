/*
 * @Author: czy0729
 * @Date: 2019-06-24 19:34:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 12:05:49
 */
import React from 'react'
import { Component, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Pagination from './component/pagination'
import Header from './header'
import { useAnitamaPage } from './hooks'

/** 二次元资讯 */
const Anitama = (props: NavigationProps) => {
  const { id, $ } = useAnitamaPage(props)

  return useObserver(() => (
    <Component id='screen-anitama'>
      <StoreContext.Provider value={id}>
        <Header />
        <Page
          style={_.select(_.container.bg, _.container.plain)}
          loaded={$.state._loaded && $.state.show}
        >
          <List />
          <Pagination />
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default Anitama
