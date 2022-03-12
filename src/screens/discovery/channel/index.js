/*
 * @Author: czy0729
 * @Date: 2020-05-02 21:02:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-12 16:59:43
 */
import React from 'react'
import { Page, ScrollView } from '@components'
import { ic } from '@utils/decorators'
import { _ } from '@stores'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Rank from './rank'
import Friends from './friends'
import Blog from './blog'
import Discuss from './discuss'
import Tags from './tags'
import Store from './store'

const Channel = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
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
    </>
  ))
}

export default ic(Store, Channel)
