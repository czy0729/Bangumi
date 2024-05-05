/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 02:34:32
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

/** 人物的角色 */
const Voices = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-voices'>
      <Header />
      <Page>
        <ToolBar />
        <List />
      </Page>
    </Component>
  ))
}

export default ic(Store, Voices)
