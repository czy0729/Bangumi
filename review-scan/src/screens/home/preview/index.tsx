/*
 * @Author: czy0729
 * @Date: 2022-10-21 12:29:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:16:01
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Header from './header'
import { usePreviewPage } from './hooks'

/** 预览 */
const Preview = (props: NavigationProps) => {
  const { id, $ } = usePreviewPage(props)

  return useObserver(() => (
    <Component id='screen-preview'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Preview
