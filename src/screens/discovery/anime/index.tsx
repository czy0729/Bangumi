/*
 * @Author: czy0729
 * @Date: 2020-07-15 11:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-04 22:35:17
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 找番剧 */
const Anime = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-anime'>
      <Header />
      <Page loaded={$.state._loaded}>
        <List />
      </Page>
    </Component>
  ))
}

export default ic(Store, Anime)
