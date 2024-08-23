/*
 * @Author: czy0729
 * @Date: 2020-10-17 16:59:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-24 07:16:29
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Extra from './component/extra'
import List from './component/list'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 章节 */
const Episodes = (_props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-episodes'>
      <Header />
      <Page loaded={$.subject._loaded}>
        <List />
      </Page>
      <Extra />
    </Component>
  ))
}

export default ic(Store, Episodes)
