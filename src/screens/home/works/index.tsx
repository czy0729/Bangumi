/*
 * @Author: czy0729
 * @Date: 2020-04-25 14:54:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 02:50:33
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import { useWorksPage } from './hooks'

import type { NavigationProps } from '@types'

/** 人物的作品 */
const Works = (props: NavigationProps) => {
  const { id, $ } = useWorksPage(props)

  return useObserver(() => (
    <Component id='screen-works'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded} loading={$.loading}>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Works
