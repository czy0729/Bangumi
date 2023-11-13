/*
 * @Author: czy0729
 * @Date: 2019-10-08 16:56:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 20:38:39
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
