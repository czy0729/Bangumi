/*
 * @Author: czy0729
 * @Date: 2020-03-22 18:45:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 21:15:13
 */
import React from 'react'
import { Page, Heatmap, Component } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Tabs from './tabs'
import Store from './store'
import { Ctx } from './types'

const Catelogs = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-catelogs'>
      <Header />
      <Page loaded={$.state._loaded}>
        <Tabs />
      </Page>
      <Heatmap bottom={_.bottom} id='用户目录' screen='Catelogs' />
    </Component>
  ))
}

export default ic(Store, Catelogs)
