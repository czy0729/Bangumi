/*
 * @Author: czy0729
 * @Date: 2019-10-03 14:44:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 13:04:20
 */
import React from 'react'
import { Page, Heatmap, Component } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Tabs from './tabs'
import Store from './store'
import { Ctx } from './types'

const Tags = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-tags'>
      <Header />
      <Page loaded={$.state._loaded}>
        <Tabs />
        <Heatmap
          right={_.wind}
          bottom={_.window.height - _.tabsHeaderHeight - 12}
          id='标签索引.标签页切换'
          transparent
        />
      </Page>
    </Component>
  ))
}

export default ic(Store, Tags)
