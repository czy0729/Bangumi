/*
 * @Author: czy0729
 * @Date: 2019-09-03 21:52:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 07:49:17
 */
import React from 'react'
import { Component, Flex, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import History from './component/history'
import Result from './component/result'
import SearchBar from './component/search-bar'
import Header from './header'
import { useTinygrailSearchPage } from './hooks'
import { memoStyles } from './styles'

/** 人物直达 */
const TinygrailSearch = (props: NavigationProps) => {
  const { id, $ } = useTinygrailSearchPage(props)

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='screen-tinygrail-search'>
        <StoreContext.Provider value={id}>
          <Page style={[_.container.tinygrail, _.container.header]}>
            <Flex style={styles.searchBar}>
              <SearchBar />
            </Flex>
            {$.state.list.length ? <Result style={_.mt.sm} /> : <History style={_.mt.sm} />}
          </Page>
          <Header />
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default TinygrailSearch
