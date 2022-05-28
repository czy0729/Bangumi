/*
 * @Author: czy0729
 * @Date: 2019-07-28 16:13:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-28 10:49:18
 */
import React from 'react'
import { Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import ToolBar from './tool-bar'
import List from './list'
import Store from './store'

const Rank = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header />
      <Page>
        {$.state.fixed && <ToolBar />}
        {$.state._loaded && <List />}
      </Page>
    </>
  ))
}

export default ic(Store, Rank)
