/*
 * @Author: czy0729
 * @Date: 2022-10-16 16:48:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 20:30:00
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import List from './component/list'
import Login from './component/login'
import Tips from './component/tips'
import Header from './header'
import { useDoubanSyncPage } from './hooks'

import type { NavigationProps } from '@types'

/** 影视同步 */
function DoubanSync(props: NavigationProps) {
  const { id, $ } = useDoubanSyncPage(props)

  return (
    <Component id='screen-douban-sync'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <Login />
          <List />
          <Tips />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(DoubanSync)
