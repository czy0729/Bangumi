/*
 * @Author: czy0729
 * @Date: 2019-06-08 02:52:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-02 17:21:23
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 分类排行 */
const Typerank = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-typerank'>
      <Header />
      <Page>{$.state._loaded && <List />}</Page>
    </Component>
  ))
}

export default ic(Store, Typerank)
