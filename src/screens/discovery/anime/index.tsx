/*
 * @Author: czy0729
 * @Date: 2020-07-15 11:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-09 14:50:51
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const Anime = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-anime'>
      <Header />
      <Page loaded={$.state._loaded}>
        <List />
      </Page>
    </Component>
  ))
}

export default ic(Store, Anime)
