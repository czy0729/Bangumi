/*
 * @Author: czy0729
 * @Date: 2019-10-08 16:56:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 13:16:02
 */
import React from 'react'
import { Component } from '@components'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import Heatmaps from './component/heatmaps'
import Page from './component/page'
import Header from './header'
import { useSayPage } from './hooks'
import Store from './store'

/** 吐槽 */
const Say = () => {
  useSayPage()

  return useObserver(() => (
    <Component id='screen-say'>
      <Header />
      <Page />
      <Heatmaps />
    </Component>
  ))
}

export default ic(Store, Say)
