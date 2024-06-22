/*
 * @Author: czy0729
 * @Date: 2021-07-15 17:18:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-22 16:45:04
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 影评 */
const Reviews = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-reviews'>
      <Header />
      <Page loaded={$.reviews._loaded}>
        <List />
      </Page>
    </Component>
  ))
}

export default ic(Store, Reviews)
