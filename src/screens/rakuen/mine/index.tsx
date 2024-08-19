/*
 * @Author: czy0729
 * @Date: 2020-05-02 15:54:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 06:56:05
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import List from './component/list'
import ListAll from './component/list-all'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 小组 */
const Mine = (_props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-mine'>
      <Header />
      <Page loaded={$.state._loaded}>{$.state.type === 'mine' ? <List /> : <ListAll />}</Page>
    </Component>
  ))
}

export default ic(Store, Mine)
