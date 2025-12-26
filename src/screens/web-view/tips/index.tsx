/*
 * @Author: czy0729
 * @Date: 2023-06-23 14:19:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-26 22:44:22
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Web from '@screens/web-view/versions/component/web'
import Header from './header'
import { useTipsPage } from './hooks'

import type { NavigationProps } from '@types'

/** 特色功能 */
const Tips = (props: NavigationProps) => {
  const { id, $ } = useTipsPage(props)

  return useObserver(() => {
    return (
      <Component id='screen-tips'>
        <StoreContext.Provider value={id}>
          <Page>
            <HeaderPlaceholder />
            {!!$.state._loaded && <Web uri={$.state.uri} />}
          </Page>
          <Header />
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default Tips
