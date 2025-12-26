/*
 * @Author: czy0729
 * @Date: 2025-03-04 19:16:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-07 15:14:58
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Textarea from './component/textarea'
import Header from './header'
import { useTinygrailTransactionPage } from './hooks'

import type { NavigationProps } from '@types'

/** 圣杯广场 */
const TinygrailTransaction = (props: NavigationProps) => {
  const { id, $ } = useTinygrailTransactionPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-transaction'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <Textarea />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailTransaction
