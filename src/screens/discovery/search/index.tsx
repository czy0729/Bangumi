/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:18:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 11:06:07
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Flex, Page } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import { STORYBOOK } from '@constants'
import Advance from './component/advance'
import BtnSubmit from './component/btn-submit'
import Category from './component/category'
import History from './component/history'
import Legacy from './component/legacy'
import List from './component/list'
import SearchBar from './component/search-bar'
import Header from './header'
import Store from './store'
import { styles } from './styles'
import { Ctx } from './types'

/** 搜索 */
const Search = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-search'>
      {STORYBOOK ? <View style={_.mt.md} /> : <Header />}
      <Page>
        <Flex style={styles.searchBar}>
          <Category />
          <Flex.Item>
            <SearchBar />
          </Flex.Item>
          <Legacy />
          <BtnSubmit />
        </Flex>
        <Advance />
        <History />
        <List />
      </Page>
    </Component>
  ))
}

export default ic(Store, Search)
