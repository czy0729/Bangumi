/*
 * @Author: czy0729
 * @Date: 2021-01-09 00:57:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-06 06:43:54
 */
import React from 'react'
import { Page } from '@components'
import { runAfter } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useMount } from '@utils/hooks'
import Extra from '../anime/extra'
import List from './list'
import Store from './store'

const Manga = (props, { $, navigation }) => {
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

export default injectWithHeader(Store, Manga, {
  screen: '找漫画',
  alias: 'Manga',
  hm: ['manga', 'Manga'],
  defaultExtra: <Extra title='Manga' />
})
