/*
 * @Author: czy0729
 * @Date: 2022-10-16 16:48:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:46:14
 */
import React from 'react'
import { Component, Page } from '@components'
import { runAfter } from '@utils'
import { ic } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Header from './header'
import List from './list'
import Login from './login'
import Store from './store'
import Tips from './tips'
import { Ctx } from './types'

/** 豆瓣同步 */
const DoubanSync = (props, { $ }: Ctx) => {
  useMount(() => {
    runAfter(() => {
      $.init()
    })
  })

  return useObserver(() => (
    <Component id='screen-douban-sync'>
      <Header />
      <Page loaded={$.state._loaded}>
        <Login />
        <List />
        <Tips />
      </Page>
    </Component>
  ))
}

export default ic(Store, DoubanSync)
