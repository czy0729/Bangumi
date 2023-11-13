/*
 * @Author: czy0729
 * @Date: 2022-02-23 06:46:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 21:27:52
 */
import React from 'react'
import { Component, Page } from '@components'
import { runAfter } from '@utils'
import { ic } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Header from './header'
import Login from './login'
import List from './list'
import Store from './store'
import { Ctx } from './types'

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
