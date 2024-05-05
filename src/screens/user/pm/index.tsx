/*
 * @Author: czy0729
 * @Date: 2020-02-02 05:03:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:41:55
 */
import React from 'react'
import { Component } from '@components'
import { ic } from '@utils/decorators'
import { useKeyboardAdjustResize, useObserver, useRunAfter } from '@utils/hooks'
import Header from './header'
import Heatmaps from './heatmaps'
import Page from './page'
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
