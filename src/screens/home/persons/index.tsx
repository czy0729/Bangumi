/*
 * @Author: czy0729
 * @Date: 2020-05-21 16:36:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 10:14:24
 */
import React from 'react'
import { Component, Page, Heatmap } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const Persons = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-persons'>
      <Header />
      <Page loaded={$.persons._loaded}>
        <List />
        <Heatmap bottom={_.bottom} id='制作人员' screen='Persons' />
      </Page>
    </Component>
  ))
}

export default ic(Store, Persons)
