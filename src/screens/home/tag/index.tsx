/*
 * @Author: czy0729
 * @Date: 2019-06-08 02:52:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 标签条目: 筛选工具条 + 列表/网格双布局展示
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import List from './component/list'
import Header from './header'
import { useTagPage } from './hooks'

import type { NavigationProps } from '@types'

/** 标签条目 */
function Tag(props: NavigationProps) {
  const { id, $ } = useTagPage(props)

  return (
    <Component id='screen-tag'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded} loading={!$.list._loaded || $.state.hide}>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Tag)
