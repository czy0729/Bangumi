/*
 * @Author: czy0729
 * @Date: 2019-09-09 17:34:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 01:38:34
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Heatmaps from './component/heatmaps'
import Tabs from './component/tabs'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 用户人物 */
const Character = (_props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-character'>
      <Header />
      <Page>{!!$.state._loaded && <Tabs />}</Page>
      <Heatmaps />
    </Component>
  ))
}

export default ic(Store, Character)
