/*
 * @Author: czy0729
 * @Date: 2022-02-23 06:46:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:46:00
 */
import React from 'react'
import { Component, Page } from '@components'
import { runAfter } from '@utils'
import { ic } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Header from './header'
import List from './list'
import Login from './login'
import Store from './store'
import { Ctx } from './types'

/** bilibili 同步 */
const BilibiliSync = (props, { $ }: Ctx) => {
  useMount(() => {
    runAfter(() => {
      $.init()
    })
  })

  return useObserver(() => (
    <Component id='screen-bilibili-sync'>
      <Header />
      <Page loaded={$.state._loaded}>
        <Login
          hide={$.state.hide}
          onToggleHide={$.onToggleHide}
          setData={$.setData}
          setReviews={$.setReviews}
        />
        <List />
      </Page>
    </Component>
  ))
}

export default ic(Store, BilibiliSync)
