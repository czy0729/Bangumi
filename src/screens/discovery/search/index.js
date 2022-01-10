/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:18:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-10 12:23:15
 */
import React from 'react'
import { Page, Flex } from '@components'
import { _ } from '@stores'
import { runAfter } from '@utils'
import { injectWithHeader } from '@utils/decorators'
import { useMount, useObserver } from '@utils/hooks'
import Category from './category'
import Legacy from './legacy'
import SearchBar from './search-bar'
import BtnSubmit from './btn-submit'
import History from './history'
import List from './list'
import Store from './store'

const Search = (props, { $, navigation }) => {
  useMount(() => {
    runAfter(() => {
      $.setParams(navigation)
      $.init()
    })
  })

  return useObserver(() => (
    <Page>
      <Flex style={styles.searchBar}>
        <Category />
        <Flex.Item>
          <SearchBar />
        </Flex.Item>
        <Legacy />
        <BtnSubmit />
      </Flex>
      <History />
      <List />
    </Page>
  ))
}

export default injectWithHeader(Store, Search, {
  screen: '搜索',
  hm: ['search', 'Search']
})

const styles = _.create({
  searchBar: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind
  }
})
