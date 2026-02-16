/*
 * @Author: czy0729
 * @Date: 2020-11-30 15:39:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 07:30:48
 */
import React from 'react'
import { Component, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Btn from './component/btn'
import List from './component/list'
import Header from './header'
import { useTinygrailClipboardPage } from './hooks'

/** 粘贴板 */
const TinygrailClipboard = (props: NavigationProps) => {
  const { id } = useTinygrailClipboardPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-clipboard'>
      <StoreContext.Provider value={id}>
        <Page style={_.container.tinygrail}>
          <List />
          <Btn />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailClipboard
