/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:54:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-27 00:00:00
 *
 * 我的小组
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import List from './component/list'
import Header from './header'
import { useMinePage } from './hooks'

import type { NavigationProps } from '@types'

/** 我的小组 */
function Mine(props: NavigationProps) {
  const { id, $ } = useMinePage(props)

  return (
    <Component id='screen-mine'>
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

export default observer(Mine)
