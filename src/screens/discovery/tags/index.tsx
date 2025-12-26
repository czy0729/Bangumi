/*
 * @Author: czy0729
 * @Date: 2019-10-03 14:44:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-25 05:15:00
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Extra from './component/extra'
import Tabs from './component/tabs'
import Header from './header'
import { useTagsPage } from './hooks'

import type { NavigationProps } from '@types'

/** 标签 */
const Tags = (props: NavigationProps) => {
  const { id, $ } = useTagsPage(props)

  return useObserver(() => (
    <Component id='screen-tags'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <Tabs />
        </Page>
        <Extra />
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Tags
