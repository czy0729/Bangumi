/*
 * @Author: czy0729
 * @Date: 2020-04-04 16:02:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-06 07:44:06
 */
import React from 'react'
import { Page } from '@components'
import { IconHoriz } from '@_'
import { runAfter } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Tabs from './tabs'
import Heatmaps from './heatmaps'
import Store from './store'

const title = '日志'

const DiscoveryBlog = (props, { $, navigation }) => {
  useMount(() => {
    runAfter(() => {
      $.setParams(navigation)
      $.init()
    })
  })

  return useObserver(() => (
    <Page loaded={$.state._loaded}>
      <Tabs />
      <Heatmaps />
    </Page>
  ))
}

export default injectWithHeader(Store, DiscoveryBlog, {
  screen: title,
  alias: '全站日志',
  hm: ['discovery/blog', 'DiscoveryBlog'],
  defaultExtra: <IconHoriz />
})
