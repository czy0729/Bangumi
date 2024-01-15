/*
 * @Author: czy0729
 * @Date: 2019-10-08 16:56:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 22:16:21
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

const Say = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  useKeyboardAdjustResize()

  return useObserver(() => (
    <Component id='screen-say'>
      <Header />
      <Page />
      <Heatmaps />
    </Component>
  ))
}

export default ic(Store, Say)
