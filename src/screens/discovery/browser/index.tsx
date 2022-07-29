/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:01:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-26 23:09:20
 */
import React from 'react'
import { Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import ToolBar from './tool-bar'
import List from './list'
import Modal from './modal'
import Store from './store'

const Browser = (props, { $ }) => {
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
          <Modal />
        </Page>
      </>
    )
  })
}

export default ic(Store, Browser)
