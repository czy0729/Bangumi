/*
 * @Author: czy0729
 * @Date: 2019-05-11 04:19:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-18 16:03:28
 */
import React from 'react'
import { Component, Heatmap, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import { useMonoPage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** 人物 */
const Topic = (props, context: Ctx) => {
  const { fixed, onScroll } = useMonoPage(context)

  return useObserver(() => (
    <Component id='screen-mono'>
      <Page statusBarEvent={false}>
        <List onScroll={onScroll} />
        <Heatmap id='人物' screen='Mono' />
      </Page>
      <Header fixed={fixed} />
    </Component>
  ))
}

export default ic(Store, Topic)
