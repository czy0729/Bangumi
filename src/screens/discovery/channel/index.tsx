/*
 * @Author: czy0729
 * @Date: 2020-05-02 21:02:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 23:04:03
 */
import React from 'react'
import { Component, Flex, HeaderPlaceholder, Mesume, Page, ScrollView } from '@components'
import RandomText from '@components/list-view/footer/random-text'
import { _, StoreContext, systemStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Blog from './component/blog'
import Discuss from './component/discuss'
import Friends from './component/friends'
import Rank from './component/rank'
import Tags from './component/tags'
import Header from './header'
import { useChannelPage } from './hooks'

import type { NavigationProps } from '@types'

/** 频道 */
const Channel = (props: NavigationProps) => {
  const { id, $ } = useChannelPage(props)

  return useObserver(() => (
    <Component id='screen-channel'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.channel._loaded}>
          <HeaderPlaceholder />
          <ScrollView contentContainerStyle={_.container.bottom}>
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
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Channel
