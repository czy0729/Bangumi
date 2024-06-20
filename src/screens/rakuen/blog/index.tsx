/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:15:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-21 05:31:28
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import Heatmaps from './component/heatmaps'
import List from './component/list'
import Header from './header'
import { useBlogPage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** 日志 */
const Blog = (props, context: Ctx) => {
  const { fixed, onScroll } = useBlogPage(context)

  return useObserver(() => (
    <Component id='screen-blog'>
      <Page statusBarEvent={false}>
        <List onScroll={onScroll} />
      </Page>
      <Header fixed={fixed} />
      <Heatmaps />
    </Component>
  ))
}

export default ic(Store, Blog)
