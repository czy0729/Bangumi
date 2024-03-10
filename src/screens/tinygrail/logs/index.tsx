/*
 * @Author: czy0729
 * @Date: 2019-09-19 00:35:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-10 17:29:07
 */
import React from 'react'
import { Page } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import Tabs from './component/tabs'
import Header from './header'
import { useTinygrailLogsPage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** 资金日志 */
const TinygrailLogs = (props, context: Ctx) => {
  useTinygrailLogsPage(context)

  const { $ } = context
  return useObserver(() => (
    <Page
      style={_.container.tinygrail}
      loaded={$.state._loaded}
      loadingColor={_.colorTinygrailText}
    >
      <Header />
      <Tabs />
    </Page>
  ))
}

export default ic(Store, TinygrailLogs)
