/*
 * @Author: czy0729
 * @Date: 2020-03-22 18:45:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:41:04
 */
import React from 'react'
import { Component, Heatmap, Page } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Tabs from './component/tabs'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 用户目录 */
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
