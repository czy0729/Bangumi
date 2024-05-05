/*
 * @Author: czy0729
 * @Date: 2020-04-25 14:54:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 02:35:02
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

/** 人物的作品 */
const Works = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const { fixed } = $.state
    return (
      <Component id='screen-works'>
        <Header />
        <Page>
          {fixed && <ToolBar />}
          <List />
        </Page>
      </Component>
    )
  })
}

export default ic(Store, Works)
