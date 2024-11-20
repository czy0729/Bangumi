/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 13:35:44
 */
import React from 'react'
import { Component, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Tabs from './component/tabs'
import Header from './header'
import { useTinygrailLogsPage } from './hooks'

/** 资金日志 */
const TinygrailLogs = (props: NavigationProps) => {
  const { id, $ } = useTinygrailLogsPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-logs'>
      <StoreContext.Provider value={id}>
        <Page
          style={_.container.tinygrail}
          loaded={$.state._loaded}
          loadingColor={_.colorTinygrailText}
        >
          <Header />
          <Tabs />
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailLogs
