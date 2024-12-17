/*
 * @Author: czy0729
 * @Date: 2019-09-03 21:52:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:43:21
 */
import React from 'react'
import { Component, Flex, HeaderV2, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import History from './history'
import { useTinygrailSearchPage } from './hooks'
import Result from './result'
import SearchBar from './search-bar'
import { HM } from './ds'
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
          <HeaderV2 backgroundStyle={_.container.tinygrail} title='人物直达' hm={HM} />
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default TinygrailSearch
