/*
 * @Author: czy0729
 * @Date: 2019-06-08 02:52:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 分类排行: 标签维度排行榜列表
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import List from './component/list'
import Header from './header'
import { useTyperankPage } from './hooks'

import type { NavigationProps } from '@types'

/** 分类排行 */
function Typerank(props: NavigationProps) {
  const { id, $ } = useTyperankPage(props)

  return (
    <Component id='screen-typerank'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded} loading={$.state.searching}>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Typerank)
