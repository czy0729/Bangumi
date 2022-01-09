/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:01:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-06 08:27:50
 */
import React from 'react'
import { Page } from '@components'
import { IconHoriz } from '@_'
import { _ } from '@stores'
import { runAfter } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Extra from './extra'
import ToolBar from './tool-bar'
import List from './list'
import Store from './store'

const Browser = (props, { $, navigation }) => {
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

export default injectWithHeader(Store, Browser, {
  screen: '索引',
  hm: ['browser', 'Browser'],
  defaultExtra: (
    <>
      <Extra style={_.mr.xs} />
      <IconHoriz />
    </>
  )
})
