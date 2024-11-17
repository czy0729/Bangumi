/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:18:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:46:27
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Flex, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { WEB } from '@constants'
import { NavigationProps } from '@types'
import Advance from './component/advance'
import BtnSubmit from './component/btn-submit'
import Category from './component/category'
import History from './component/history'
import Legacy from './component/legacy'
import List from './component/list'
import SearchBar from './component/search-bar'
import Header from './header'
import { useSearchPage } from './hooks'
import { styles } from './styles'

/** 搜索 */
const Search = (props: NavigationProps) => {
  const { id } = useSearchPage(props)

  return useObserver(() => (
    <Component id='screen-search'>
      <StoreContext.Provider value={id}>
        {WEB ? <View style={_.mt.md} /> : <Header />}
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
      </StoreContext.Provider>
    </Component>
  ))
}

export default Search
