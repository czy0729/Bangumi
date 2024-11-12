/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:37:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-12 09:52:48
 */
import React from 'react'
import { Component, Page } from '@components'
import { TapListener } from '@_'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import Cate from './component/cate'
import List from './component/list'
import Tips from './component/tips'
import Header from './header'
import { useLikePage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** 猜你喜欢 */
const Like = (_props, context: Ctx) => {
  useLikePage(context)

  const { $ } = context
  return useObserver(() => (
    <Component id='screen-like'>
      <Header />
      <TapListener>
        <Page loaded={$.state._loaded}>
          <Cate />
          <List />
          <Tips />
        </Page>
      </TapListener>
    </Component>
  ))
}

export default ic(Store, Like)
