/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:18:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 06:01:06
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Component, Flex, HeaderPlaceholder, HeaderV2, Heatmap, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import History from './component/history'
import List from './component/list'
import SearchBar from './component/search-bar'
import { useRakuenSearchPage } from './hooks'
import { HM } from './ds'
import { memoStyles } from './styles'

import type { NavigationProps } from '@types'

/** 小组搜索 */
const RakuenSearch = (props: NavigationProps) => {
  const { id, $ } = useRakuenSearchPage(props)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <Component id='screen-rakuen-search'>
        <StoreContext.Provider value={id}>
          <Page>
            <HeaderPlaceholder />
            <Flex style={styles.searchBar}>
              <Flex.Item>
                <SearchBar />
              </Flex.Item>
              <View style={_.ml.sm}>
                <Button style={styles.btn} type='ghostPlain' size='sm' onPress={$.doSearch}>
                  查询
                </Button>
                <Heatmap id='帖子搜索.搜索' />
              </View>
            </Flex>
            <History style={_.mt.sm} />
            <List $={$} />
          </Page>
          <HeaderV2 title='小组搜索' hm={HM} />
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default RakuenSearch
