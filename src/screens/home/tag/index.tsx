/*
 * @Author: czy0729
 * @Date: 2019-06-08 02:52:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 01:41:33
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Header from './header'
import List from './list'
import Store from './store'
import ToolBar from './tool-bar'
import { Ctx } from './types'

/** 标签条目 */
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
