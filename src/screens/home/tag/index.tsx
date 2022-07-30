/*
 * @Author: czy0729
 * @Date: 2019-06-08 02:52:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 04:14:54
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
import { Ctx } from './types'

const Tag = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const { _loaded, fixed } = $.state
    return (
      <>
        <Header />
        <Page>
          {fixed && <ToolBar />}
          {_loaded && <List />}
          <Modal />
        </Page>
      </>
    )
  })
}

export default ic(Store, Tag)
