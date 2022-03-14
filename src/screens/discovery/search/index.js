/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:18:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-12 23:23:59
 */
import React from 'react'
import { Page, Flex } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Category from './category'
import Legacy from './legacy'
import SearchBar from './search-bar'
import BtnSubmit from './btn-submit'
import History from './history'
import List from './list'
import Store from './store'

const Search = (props, { $ }) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <>
      <Header />
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
    </>
  ))
}

export default ic(Store, Search)

const styles = _.create({
  searchBar: {
    paddingBottom: _.sm,
    paddingHorizontal: _.wind
  }
})
