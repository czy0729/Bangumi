/*
 * @Author: czy0729
 * @Date: 2019-06-08 02:52:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-07 03:30:01
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Header from './header'
import { useTagPage } from './hooks'

/** 标签条目 */
const Tag = (props: NavigationProps) => {
  const { id, $ } = useTagPage(props)

  return useObserver(() => (
    <Component id='screen-tag'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded} loading={!$.list._loaded || $.state.hide}>
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Tag
