/*
 * @Author: czy0729
 * @Date: 2020-07-15 11:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-06 06:45:05
 */
import React from 'react'
import { Page } from '@components'
import { runAfter } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useMount } from '@utils/hooks'
import Extra from './extra'
import List from './list'
import Store from './store'

const Anime = (props, { $, navigation }) => {
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

export default injectWithHeader(Store, Anime, {
  screen: '找番剧',
  alias: 'Anime',
  hm: ['anime', 'Anime'],
  defaultExtra: <Extra />
})
