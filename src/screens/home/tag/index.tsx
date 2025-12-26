/*
 * @Author: czy0729
 * @Date: 2019-06-08 02:52:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 02:24:05
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import { useTagPage } from './hooks'

import type { NavigationProps } from '@types'

/** 标签条目 */
const Tag = (props: NavigationProps) => {
  const { id, $ } = useTagPage(props)

  return useObserver(() => (
    <Component id='screen-tag'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded} loading={!$.list._loaded || $.state.hide}>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Tag
