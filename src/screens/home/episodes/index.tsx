/*
 * @Author: czy0729
 * @Date: 2020-10-17 16:59:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 12:46:27
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import Extra from './component/extra'
import List from './component/list'
import Header from './header'
import { useEpisodesPage } from './hooks'

import type { NavigationProps } from '@types'

/** 章节 */
function Episodes(props: NavigationProps) {
  const { id, $ } = useEpisodesPage(props)

  return (
    <Component id='screen-episodes'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.subject._loaded}>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header />
        <Extra />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Episodes)
