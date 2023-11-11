/*
 * @Author: czy0729
 * @Date: 2019-09-09 17:34:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-12 22:48:50
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Tabs from './tabs'
import Heatmaps from './heatmaps'
import Store from './store'

const Character = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-character'>
      <Header />
      <Page>
        {!!$.state._loaded && <Tabs />}
        <Heatmaps />
      </Page>
    </Component>
  ))
}

export default ic(Store, Character)
