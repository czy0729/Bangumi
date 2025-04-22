/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 05:09:22
 */
import React from 'react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import TinygrailHeader from '@tinygrail/_/header'
import TinygrailPage from '@tinygrail/_/page'
import { NavigationProps } from '@types'
import Tabs from './component/tabs'
import { useTinygrailLogsPage } from './hooks'
import { HM } from './ds'

/** 资金日志 */
const TinygrailLogs = (props: NavigationProps) => {
  const { id, $ } = useTinygrailLogsPage(props)

  return useObserver(() => (
    <Component id='screen-tinygrail-logs'>
      <StoreContext.Provider value={id}>
        <TinygrailPage loading={!$.balance._loaded}>
          <Tabs />
        </TinygrailPage>
        <TinygrailHeader title='资金日志' hm={HM} go />
      </StoreContext.Provider>
    </Component>
  ))
}

export default TinygrailLogs
