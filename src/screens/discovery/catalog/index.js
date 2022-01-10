/*
 * @Author: czy0729
 * @Date: 2020-01-02 16:52:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-09 11:18:55
 */
import React from 'react'
import { Page } from '@components'
import { runAfter } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Type from './type'
import List from './list'
import Store from './store'

const Catalog = (props, { $, navigation }) => {
  useMount(() => {
    runAfter(() => {
      $.setParams(navigation)
      $.init()
    })
  })

  return useObserver(() => (
    <Page loaded={$.state._loaded}>
      <List />
    </Page>
  ))
}

export default injectWithHeader(Store, Catalog, {
  screen: '目录',
  hm: ['discovery/catalog', 'Catalog'],
  defaultExtra: <Type />
})
