/*
 * @Author: czy0729
 * @Date: 2020-03-04 10:15:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 20:23:55
 */
import React from 'react'
import { Component, Page } from '@components'
import { useOnScroll } from '@components/header/utils'
import { ic } from '@utils/decorators'
import { useObserver, useKeyboardAdjustResize, useRunAfter } from '@utils/hooks'
import Header from './header'
import List from './list'
import Heatmaps from './heatmaps'
import Store from './store'
import { Ctx } from './types'

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
