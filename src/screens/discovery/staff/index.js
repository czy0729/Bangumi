/*
 * @Author: czy0729
 * @Date: 2021-04-15 19:50:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-10 13:11:48
 */
import React from 'react'
import { Page, Heatmap } from '@components'
import { _ } from '@stores'
import { runAfter } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import List from './list'
import Store from './store'

const title = '新番'

const Staff = (props, { $ }) => {
  useMount(() => {
    runAfter(() => {
      $.init()
    })
  })

  return useObserver(() => (
    <Page loaded={$.state._loaded}>
      <List />
      <Heatmap bottom={_.bottom} id={title} screen='Staff' />
    </Page>
  ))
}

export default injectWithHeader(Store, Staff, {
  screen: title,
  hm: ['user/lilyurey/index', 'Staff']
})
