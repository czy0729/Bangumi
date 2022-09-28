/*
 * @Author: czy0729
 * @Date: 2019-10-08 16:56:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 06:30:30
 */
import React from 'react'
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
    <>
      <Header />
      <Page />
      <Heatmaps />
    </>
  ))
}

export default ic(Store, Say)
