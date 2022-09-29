/*
 * @Author: czy0729
 * @Date: 2022-02-23 06:46:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 18:39:08
 */
import React from 'react'
import { Page } from '@components'
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
    <>
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
    </>
  ))
}

export default ic(Store, BilibiliSync)
