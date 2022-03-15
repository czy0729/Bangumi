/*
 * @Author: czy0729
 * @Date: 2019-10-08 16:56:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 00:07:17
 */
import React from 'react'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Page from './page'
import Heatmaps from './heatmaps'
import Store from './store'

const Say = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header />
      <Page />
      <Heatmaps />
    </>
  ))
}

export default ic(Store, Say)
