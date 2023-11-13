/*
 * @Author: czy0729
 * @Date: 2020-05-21 16:36:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-12 07:44:11
 */
import React from 'react'
import { Page, Heatmap, Component } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const Characters = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-characters'>
      <Header />
      <Page loaded={$.characters._loaded}>
        <List />
        <Heatmap bottom={_.bottom} id='更多角色' screen='Characters' />
      </Page>
    </Component>
  ))
}

export default ic(Store, Characters)
