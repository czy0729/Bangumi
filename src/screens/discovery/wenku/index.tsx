/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 01:23:40
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Header from '../anime/header'
import List from './list'
import Store from './store'
import { Ctx } from './types'

/** 找文库 */
const Wenku = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-wenku'>
      <Header title='找文库' alias='文库' hm={['wenku', 'Wenku']} />
      <Page loaded={$.state._loaded}>
        <List />
      </Page>
    </Component>
  ))
}

export default ic(Store, Wenku)
