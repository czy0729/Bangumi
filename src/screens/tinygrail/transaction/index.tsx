/*
 * @Author: czy0729
 * @Date: 2025-03-04 19:16:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-07 15:14:58
 */
import React from 'react'
import { Component, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Textarea from './component/textarea'
import Header from './header'
import { useTinygrailTransactionPage } from './hooks'

/** 圣杯广场 */
const TinygrailTransaction = (props: NavigationProps) => {
  const { id, $ } = useTinygrailTransactionPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-transaction'>
      <StoreContext.Provider value={id}>
        <Page style={_.container.header} loaded={$.state._loaded}>
          <Textarea />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailTransaction
