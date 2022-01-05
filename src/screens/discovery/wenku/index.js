/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-06 06:54:25
 */
import React from 'react'
import { Page } from '@components'
import { runAfter } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useMount } from '@utils/hooks'
import Extra from '../anime/extra'
import List from './list'
import Store from './store'

const Wenku = (props, { $, navigation }) => {
  useMount(() => {
    runAfter(() => {
      $.setParams(navigation)
      $.init()
    })

    return () => {
      $.scrollToOffset = null
    }
  })

  return (
    <Page>
      <List />
    </Page>
  )
}

export default injectWithHeader(Store, Wenku, {
  screen: '找文库',
  hm: ['wenku', 'Wenku'],
  defaultExtra: <Extra title='文库' />
})
