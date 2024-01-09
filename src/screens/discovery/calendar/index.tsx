/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-12 17:44:59
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

const Calendar = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-calendar'>
      <Header />
      <Page loaded={!!($.state._loaded && $.calendar._loaded)}>
        <List />
      </Page>
    </Component>
  ))
}

export default ic(Store, Calendar)
