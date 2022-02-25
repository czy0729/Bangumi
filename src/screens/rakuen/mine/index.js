/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:54:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-02-25 13:50:54
 */
import React from 'react'
import { Page } from '@components'
import { runAfter } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Extra from './extra'
import List from './list'
import ListAll from './list-all'
import Store from './store'

const Mine = (props, { $, navigation }) => {
  useMount(() => {
    runAfter(() => {
      $.setParams(navigation)
      $.init()
    })
  })

  return useObserver(() => {
    const { type } = $.state
    return <Page>{type === 'mine' ? <List /> : <ListAll />}</Page>
  })
}

export default injectWithHeader(Store, Mine, {
  screen: '小组',
  hm: ['group/mine', 'Mine'],
  defaultExtra: <Extra />
})
