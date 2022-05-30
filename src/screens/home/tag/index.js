/*
 * @Author: czy0729
 * @Date: 2019-06-08 02:52:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-30 08:15:12
 */
import React from 'react'
import { Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import ToolBar from './tool-bar'
import List from './list'
import Store from './store'

const Tag = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const { fixed } = $.state
    return (
      <>
        <Header />
        <Page>
          {fixed && <ToolBar />}
          {$.state._loaded && <List />}
        </Page>
      </>
    )
  })
}

export default ic(Store, Tag)
