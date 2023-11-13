/*
 * @Author: czy0729
 * @Date: 2020-04-25 14:54:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 12:13:05
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
