/*
 * @Author: czy0729
 * @Date: 2020-11-30 15:39:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:33:31
 */
import React from 'react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import TinygrailPage from '@tinygrail/_/page'
import Btn from './component/btn'
import List from './component/list'
import Header from './header'
import { useTinygrailClipboardPage } from './hooks'

import type { NavigationProps } from '@types'

/** 粘贴板 */
const TinygrailClipboard = (props: NavigationProps) => {
  const { id } = useTinygrailClipboardPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-clipboard'>
      <StoreContext.Provider value={id}>
        <TinygrailPage>
          <List />
          <Btn />
        </TinygrailPage>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailClipboard
