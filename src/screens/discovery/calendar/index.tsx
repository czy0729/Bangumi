/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 16:18:47
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const Calendar = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-calendar'>
      <Header />
      <Page loaded={$.calendar._loaded}>
        <List />
      </Page>
    </Component>
  ))
}

export default ic(Store, Calendar)
