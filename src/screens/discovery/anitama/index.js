/*
 * @Author: czy0729
 * @Date: 2019-06-24 19:34:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-10 11:26:08
 */
import React from 'react'
import { Page } from '@components'
import { IconHoriz } from '@_'
import { _ } from '@stores'
import { runAfter } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useObserver, useMount } from '@utils/hooks'
import List from './list'
import Store from './store'

const Anitama = (props, { $, navigation }) => {
  useMount(() => {
    runAfter(() => {
      $.setParams(navigation)
      $.init()
    })
  })

  return useObserver(() => (
    <Page style={_.select(_.container.bg, _.container.plain)} loaded={$.state._loaded}>
      <List />
    </Page>
  ))
}

export default injectWithHeader(Store, Anitama, {
  screen: '资讯',
  alias: 'Anitama',
  hm: ['discovery/anitama', 'Anitama'],
  defaultExtra: <IconHoriz name='md-menu' />
})
