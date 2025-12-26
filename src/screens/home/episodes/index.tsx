/*
 * @Author: czy0729
 * @Date: 2020-10-17 16:59:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:28:42
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Extra from './component/extra'
import List from './component/list'
import Header from './header'
import { useEpisodesPage } from './hooks'

import type { NavigationProps } from '@types'

/** 章节 */
const Episodes = (props: NavigationProps) => {
  const { id, $ } = useEpisodesPage(props)

  return useObserver(() => (
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
  ))
}

export default Episodes
