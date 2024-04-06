/*
 * @Author: czy0729
 * @Date: 2020-05-02 21:02:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-06 21:37:47
 */
import React from 'react'
import { Component, Page, ScrollView } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Blog from './component/blog'
import Discuss from './component/discuss'
import Friends from './component/friends'
import Rank from './component/rank'
import Tags from './component/tags'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 频道 */
const Channel = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-channel'>
      <Header />
      <Page loaded={$.channel._loaded}>
        <ScrollView contentContainerStyle={_.container.bottom} scrollToTop>
          <Rank />
          <Friends />
          <Blog />
          <Discuss />
          <Tags />
        </ScrollView>
      </Page>
    </Component>
  ))
}

export default ic(Store, Channel)
