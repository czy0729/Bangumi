/*
 * @Author: czy0729
 * @Date: 2019-10-03 14:44:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-05 04:54:03
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Extra from './component/extra'
import Tabs from './component/tabs'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 标签 */
const Tags = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-tags'>
      <Header />
      <Page loaded={$.state._loaded}>
        <Tabs />
      </Page>
      <Extra />
    </Component>
  ))
}

export default ic(Store, Tags)
