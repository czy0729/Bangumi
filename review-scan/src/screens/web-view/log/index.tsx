/*
 * @Author: czy0729
 * @Date: 2025-02-18 05:08:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-22 11:12:36
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Component, Page } from '@components'
import { _, StoreContext } from '@stores'
import { NavigationProps } from '@types'
import Form from './component/form'
import List from './component/list'
import Summary from './component/summary'
import Header from './header'
import { useLogPage } from './hooks'

/** 错误上报分析 */
const Log = (props: NavigationProps) => {
  const { id } = useLogPage(props)

  return useObserver(() => (
    <Component id='screen-log'>
      <StoreContext.Provider value={id}>
        <Page style={_.container.header}>
          <List />
        </Page>
        <Form />
        <Header />
        <Summary />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Log
