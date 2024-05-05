/*
 * @Author: czy0729
 * @Date: 2019-11-28 16:57:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 20:25:07
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Header from './header'
import List from './list'
import SectionList from './section-list'
import Store from './store'
import { Ctx } from './types'

/** 本地帖子 */
const RakuenHistory = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const { favor } = $.state
    return (
      <Component id='screen-history'>
        <Header />
        <Page loaded={$.state._loaded}>{favor ? <List /> : <SectionList />}</Page>
      </Component>
    )
  })
}

export default ic(Store, RakuenHistory)
