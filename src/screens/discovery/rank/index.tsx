/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:13:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:39:54
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Layout from './component/layout'
import Pagination from './component/pagination'
import ToolBar from './component/tool-bar'
import Header from './header'
import { useRankPage } from './hooks'

/** 排行榜 */
const Rank = (props: NavigationProps) => {
  const { id, $ } = useRankPage(props)

  return useObserver(() => (
    <Component id='screen-rank'>
      <StoreContext.Provider value={id}>
        <Header />
        <Page>
          {$.state.fixed && <ToolBar />}
          {$.state._loaded && <Layout />}
          {$.state.fixedPagination && <Pagination />}
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default Rank
