/*
 * @Author: czy0729
 * @Date: 2020-07-15 11:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 找番剧: 条件筛选 + 列表/网格
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import List from './component/list'
import Header from './header'
import { useAnimePage } from './hooks'

export { Header }

import type { NavigationProps } from '@types'

/** 找番剧 */
function Anime(props: NavigationProps) {
  const { id, $ } = useAnimePage(props)

  return (
    <Component id='screen-anime'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Anime)
