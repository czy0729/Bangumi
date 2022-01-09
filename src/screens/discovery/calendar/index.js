/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-08 07:48:31
 */
import React from 'react'
import { Page } from '@components'
import { runAfter } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useMount } from '@utils/hooks'
import Extra from './extra'
import List from './list'
import Store from './store'

const Calendar = (props, { $, navigation }) => {
  useMount(() => {
    runAfter(() => {
      $.setParams(navigation)
      $.init()
    })
  })

  return (
    <Page loaded={$.calendar._loaded}>
      <List />
    </Page>
  )
}

export default injectWithHeader(Store, Calendar, {
  screen: '找番剧',
  hm: ['calendar', 'Calendar'],
  defaultExtra: <Extra />
})
