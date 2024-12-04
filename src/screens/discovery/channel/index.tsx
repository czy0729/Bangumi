/*
 * @Author: czy0729
 * @Date: 2020-05-02 21:02:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-04 01:06:28
 */
import React from 'react'
import { Component, Flex, Mesume, Page, ScrollView } from '@components'
import RandomText from '@components/list-view/footer/random-text'
import { _, StoreContext, systemStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Blog from './component/blog'
import Discuss from './component/discuss'
import Friends from './component/friends'
import Rank from './component/rank'
import Tags from './component/tags'
import Header from './header'
import { useChannelPage } from './hooks'

/** 频道 */
const Channel = (props: NavigationProps) => {
  const { id, $ } = useChannelPage(props)

  return useObserver(() => (
    <Component id='screen-channel'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.channel._loaded}>
          <ScrollView contentContainerStyle={[_.container.header, _.container.bottom]}>
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
