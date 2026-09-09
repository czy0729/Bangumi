/*
 * @Author: czy0729
 * @Date: 2025-02-18 05:08:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-26 22:41:21
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import Form from './component/form'
import List from './component/list'
import Summary from './component/summary'
import Header from './header'
import { useLogPage } from './hooks'

import type { NavigationProps } from '@types'

/** 错误上报分析 */
function Log(props: NavigationProps) {
  const { id } = useLogPage(props)

  return (
    <Component id='screen-log'>
      <StoreContext.Provider value={id}>
        <Page>
          <HeaderPlaceholder />
          <List />
        </Page>
        <Form />
        <Header />
        <Summary />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Log)
