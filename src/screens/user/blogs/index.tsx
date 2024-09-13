/*
 * @Author: czy0729
 * @Date: 2020-03-22 14:18:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 18:12:13
 */
import React from 'react'
import { Component, Heatmap, Page } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 用户日志 */
const UserBlogs = (_props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-user-blogs'>
      <Header />
      <Page>
        <List />
      </Page>
      <Heatmap bottom={_.bottom} id='用户日志' screen='Blogs' />
    </Component>
  ))
}

export default ic(Store, UserBlogs)
