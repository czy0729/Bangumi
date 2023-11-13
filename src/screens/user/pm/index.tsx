/*
 * @Author: czy0729
 * @Date: 2020-02-02 05:03:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 21:16:21
 */
import React from 'react'
import { Component } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver, useKeyboardAdjustResize } from '@utils/hooks'
import Header from './header'
import Page from './page'
import Heatmaps from './heatmaps'
import Store from './store'
import { Ctx } from './types'

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
