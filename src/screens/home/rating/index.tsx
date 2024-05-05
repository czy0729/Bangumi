/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:22:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 01:39:11
 */
import React from 'react'
import { Component, Heatmap, Page } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Tab from './component/tab'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 用户评分 */
const Rating = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-rating'>
      <Header />
      <Page loaded={$.state._loaded}>
        <Tab />
        <Heatmap bottom={_.bottom} id='用户评分' screen='Rating' />
      </Page>
    </Component>
  ))
}

export default ic(Store, Rating)
