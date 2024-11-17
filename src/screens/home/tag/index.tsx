/*
 * @Author: czy0729
 * @Date: 2019-06-08 02:52:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:44:35
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import ToolBar from './component/tool-bar'
import Header from './header'
import { useTagPage } from './hooks'

/** 标签条目 */
const Tag = (props: NavigationProps) => {
  const { id, $ } = useTagPage(props)

  return useObserver(() => (
    <Component id='screen-tag'>
      <StoreContext.Provider value={id}>
        <Header />
        <Page>
          {$.state.fixed && <ToolBar />}
          {$.state._loaded && <List />}
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default Tag
