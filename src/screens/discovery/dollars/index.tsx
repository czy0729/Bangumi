/*
 * @Author: czy0729
 * @Date: 2023-04-26 15:22:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-06 12:33:19
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Textarea from './component/textarea'
import Header from './header'
import { useDollarsPage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** Dollars */
const Dollars = (props, context: Ctx) => {
  useDollarsPage(context)

  const { $ } = context
  return useObserver(() => (
    <Component id='screen-dollars'>
      <Header />
      <Page loaded={$.dollars._loaded}>
        <Textarea />
        <List />
      </Page>
    </Component>
  ))
}

export default ic(Store, Dollars)
