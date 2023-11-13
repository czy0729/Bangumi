/*
 * @Author: czy0729
 * @Date: 2019-06-08 02:52:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 17:36:42
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import ToolBar from './tool-bar'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const Tag = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const { _loaded, fixed } = $.state
    return (
      <Component id='screen-tag'>
        <Header />
        <Page>
          {fixed && <ToolBar />}
          {_loaded && <List />}
        </Page>
      </Component>
    )
  })
}

export default ic(Store, Tag)
