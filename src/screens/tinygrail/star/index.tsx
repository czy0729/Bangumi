/*
 * @Author: czy0729
 * @Date: 2021-02-28 14:13:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-09 05:26:49
 */
import React from 'react'
import { Page } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Logs from './component/logs'
import ToolBar from './component/tool-bar'
import { useTinygrailStarPage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** 通天塔 */
const TinygrailStar = (props, context: Ctx) => {
  useTinygrailStarPage(context)

  return useObserver(() => (
    <Page style={_.container.tinygrail}>
      <ToolBar />
      <List />
      <Logs />
    </Page>
  ))
}

export default ic(Store, TinygrailStar)
