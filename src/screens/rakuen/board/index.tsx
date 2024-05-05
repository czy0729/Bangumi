/*
 * @Author: czy0729
 * @Date: 2021-04-07 10:23:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 03:36:02
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Header from './header'
import List from './list'
import Store from './store'
import { Ctx } from './types'

/** 讨论版 */
const Board = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-board'>
      <Header />
      <Page loaded={$.board._loaded}>
        <List />
      </Page>
    </Component>
  ))
}

export default ic(Store, Board)
