/*
 * @Author: czy0729
 * @Date: 2022-10-21 12:29:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-07 01:26:33
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 预览 */
const Preview = (_props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-preview'>
      <Header />
      <Page loaded={$.state._loaded}>
        <List />
      </Page>
    </Component>
  ))
}

export default ic(Store, Preview)
