/*
 * @Author: czy0729
 * @Date: 2022-10-16 16:48:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-17 18:21:53
 */
import React from 'react'
import { Page } from '@components'
import { runAfter } from '@utils'
import { ic } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Header from './header'
import Login from './login'
import List from './list'
import Tips from './tips'
import Store from './store'
import { Ctx } from './types'

const DoubanSync = (props, { $ }: Ctx) => {
  useMount(() => {
    runAfter(() => {
      $.init()
    })
  })

  return useObserver(() => (
    <>
      <Header />
      <Page loaded={$.state._loaded}>
        <Login />
        <List />
        <Tips />
      </Page>
    </>
  ))
}

export default ic(Store, DoubanSync)
