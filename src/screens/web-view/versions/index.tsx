/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:37:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-26 22:44:37
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Web from './component/web'
import Header from './header'
import { useVersionsPage } from './hooks'

import type { NavigationProps } from '@types'

/** 更新内容 */
const Versions = (props: NavigationProps) => {
  const { id, $ } = useVersionsPage(props)

  return useObserver(() => (
    <Component id='screen-versions'>
      <StoreContext.Provider value={id}>
        <Page>
          <HeaderPlaceholder />
          {!!$.state._loaded && <Web uri={$.state.uri} />}
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Versions
