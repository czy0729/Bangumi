/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:13:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-10 11:30:30
 */
import React from 'react'
import { Page } from '@components'
import { runAfter } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import ToolBar from './tool-bar'
import List from './list'
import Store from './store'

const Rank = (props, { $, navigation }) => {
  useMount(() => {
    runAfter(() => {
      $.setParams(navigation)
      $.init()
    })
  })

  return useObserver(() => (
    <Page>
      <ToolBar />
      {$.state._loaded && <List />}
    </Page>
  ))
}

export default injectWithHeader(Store, Rank, {
  screen: '排行榜',
  hm: ['rank', 'Rank']
})
