/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:22:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 10:54:37
 */
import React from 'react'
import { Component, Page, Heatmap } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Tab from './tab'
import Store from './store'
import { Ctx } from './types'

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
