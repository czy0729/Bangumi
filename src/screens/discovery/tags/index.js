/*
 * @Author: czy0729
 * @Date: 2019-10-03 14:44:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-10 13:23:08
 */
import React from 'react'
import { Page, Heatmap } from '@components'
import { IconHoriz } from '@_'
import { _ } from '@stores'
import { runAfter } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Tabs from './tabs'
import Store from './store'

const Tags = (props, { $, navigation }) => {
  useMount(() => {
    runAfter(() => {
      $.setParams(navigation)
      $.init()
    })
  })

  return useObserver(() => (
    <Page loaded={$.state._loaded}>
      <Tabs />
      <Heatmap
        right={_.wind}
        bottom={_.window.height - _.tabsHeaderHeight - 12}
        id='标签索引.标签页切换'
        transparent
      />
    </Page>
  ))
}

export default injectWithHeader(Store, Tags, {
  screen: '标签',
  alias: '标签索引',
  hm: ['discovery/tags', 'Tags'],
  defaultExtra: <IconHoriz />
})
