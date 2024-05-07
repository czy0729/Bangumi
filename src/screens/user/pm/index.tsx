/*
 * @Author: czy0729
 * @Date: 2020-02-02 05:03:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 22:08:50
 */
import React from 'react'
import { Component } from '@components'
import { ic } from '@utils/decorators'
import { useKeyboardAdjustResize, useObserver, useRunAfter } from '@utils/hooks'
import Heatmaps from './component/heatmaps'
import Page from './component/page'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 短信 */
const PM = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })
  useKeyboardAdjustResize()

  return useObserver(() => (
    <Component id='screen-pm'>
      <Header />
      <Page />
      <Heatmaps />
    </Component>
  ))
}

export default ic(Store, PM)
