/*
 * @Author: czy0729
 * @Date: 2019-06-08 02:52:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:30:07
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import { useTyperankPage } from './hooks'

import type { NavigationProps } from '@types'

/** 分类排行 */
const Typerank = (props: NavigationProps) => {
  const { id, $ } = useTyperankPage(props)

  return useObserver(() => (
    <Component id='screen-typerank'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded} loading={$.state.searching}>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Typerank
