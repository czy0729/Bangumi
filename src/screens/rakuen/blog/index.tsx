/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:15:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 04:42:59
 */
import React from 'react'
import { Component, Page } from '@components'
import { useOnScroll } from '@components/header/utils'
import { ic } from '@utils/decorators'
import { useKeyboardAdjustResize, useObserver, useRunAfter } from '@utils/hooks'
import Heatmaps from './component/heatmaps'
import List from './component/list'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 日志 */
const Blog = (props, { $ }: Ctx) => {
  const { fixed, onScroll } = useOnScroll()
  useRunAfter(async () => {
    await $.init()
  })
  useKeyboardAdjustResize()

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
