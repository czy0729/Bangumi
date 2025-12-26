/*
 * @Author: czy0729
 * @Date: 2022-10-21 12:29:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:29:19
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import { usePreviewPage } from './hooks'

import type { NavigationProps } from '@types'

/** 预览 */
const Preview = (props: NavigationProps) => {
  const { id, $ } = usePreviewPage(props)

  return useObserver(() => (
    <Component id='screen-preview'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Preview
