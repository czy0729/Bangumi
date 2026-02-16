/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:01:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:56:53
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Header from './header'
import { useBrowserPage } from './hooks'

/** 索引 */
const Browser = (props: NavigationProps) => {
  const { id, $ } = useBrowserPage(props)

  return useObserver(() => (
    <Component id='screen-browser'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded} loading={!$.list._loaded}>
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Browser
