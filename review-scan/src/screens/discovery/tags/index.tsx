/*
 * @Author: czy0729
 * @Date: 2019-10-03 14:44:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:08:06
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Extra from './component/extra'
import Tabs from './component/tabs'
import Header from './header'
import { useTagsPage } from './hooks'

/** 标签 */
const Tags = (props: NavigationProps) => {
  const { id, $ } = useTagsPage(props)

  return useObserver(() => (
    <Component id='screen-tags'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <Tabs />
        </Page>
        <Extra />
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Tags
