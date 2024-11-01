/*
 * @Author: czy0729
 * @Date: 2019-11-28 16:57:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-01 11:50:21
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Tab from './component/tab'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 帖子聚合 */
const RakuenHistory = (_props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-history'>
      <Header />
      <Page loaded={$.state._loaded}>
        <Tab />
      </Page>
    </Component>
  ))
}

export default ic(Store, RakuenHistory)
