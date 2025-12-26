/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:18:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 01:25:12
 */
import React from 'react'
import { Component, Flex, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
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

import type { NavigationProps } from '@types'

/** 搜索 */
const Search = (props: NavigationProps) => {
  const { id, $, iptRef, handleFocus } = useSearchPage(props)

  return useObserver(() => (
    <Component id='screen-search'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded} loading={$.state.searching}>
          <HeaderPlaceholder />
          <Flex style={styles.searchBar}>
            <Category onFocus={handleFocus} />
            <Flex.Item>
              <SearchBar iptRef={iptRef} />
            </Flex.Item>
            <Legacy onFocus={handleFocus} />
            <BtnSubmit />
          </Flex>
          <Advance />
          <History />
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Search
