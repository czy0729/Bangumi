/*
 * @Author: czy0729
 * @Date: 2020-05-02 21:02:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-20 16:56:56
 */
import React from 'react'
import { Component, Flex, Mesume, Page, ScrollView } from '@components'
import RandomText from '@components/list-view/footer/random-text'
import { _, systemStore } from '@stores'
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
const Channel = (_props, { $ }: Ctx) => {
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
          <Flex style={_.mt.lg} justify='center' direction='column'>
            <Mesume size={80} />
            {systemStore.setting.speech && <RandomText />}
          </Flex>
        </ScrollView>
      </Page>
    </Component>
  ))
}

export default ic(Store, Channel)
