/*
 * @Author: czy0729
 * @Date: 2021-04-15 19:50:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-11 22:52:51
 */
import React from 'react'
import { Header, Page, Heatmap } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import List from './list'
import Store from './store'

const Staff = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header title='新番' hm={['user/lilyurey/index', 'Staff']} />
      <Page loaded={$.state._loaded}>
        <List />
        <Heatmap bottom={_.bottom} id='新番' screen='Staff' />
      </Page>
    </>
  ))
}

export default ic(Store, Staff)
