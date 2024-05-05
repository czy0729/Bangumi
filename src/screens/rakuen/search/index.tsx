/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:18:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-13 20:34:25
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Component, Flex, Header, Heatmap, Page } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import History from './history'
import List from './list'
import SearchBar from './search-bar'
import Store from './store'
import { memoStyles } from './styles'
import { Ctx } from './types'

/** 小组搜索 */
const RakuenSearch = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='screen-rakuen-search'>
        <Header title='小组搜索' hm={['rakuenSearch', 'RakuenSearch']} />
        <Page>
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
          <List />
        </Page>
      </Component>
    )
  })
}

export default ic(Store, RakuenSearch)
