/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 13:35:24
 */
import { observer } from 'mobx-react'
import { Component } from '@components'
import { StoreContext } from '@stores'
import TinygrailHeader from '@tinygrail/_/header'
import TinygrailPage from '@tinygrail/_/page'
import Tabs from './component/tabs'
import { useTinygrailLogsPage } from './hooks'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** 资金日志 */
function TinygrailLogs(props: NavigationProps) {
  const { id, $ } = useTinygrailLogsPage(props)

  return (
    <Component id='screen-tinygrail-logs'>
      <StoreContext.Provider value={id}>
        <TinygrailPage loading={!$.balance._loaded}>
          <Tabs />
        </TinygrailPage>
        <TinygrailHeader title='资金日志' hm={HM} go />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(TinygrailLogs)
