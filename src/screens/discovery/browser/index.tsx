/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:01:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 13:56:17
 */
import React from 'react'
import { Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import ToolBar from './tool-bar'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const Browser = (props, { $ }: Ctx) => {
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

export default ic(Store, Browser)
