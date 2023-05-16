/*
 * @Author: czy0729
 * @Date: 2019-05-15 02:18:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-16 07:48:27
 */
import React from 'react'
import { View } from 'react-native'
import { Page, Header, Flex, Button, Heatmap } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import SearchBar from './search-bar'
import History from './history'
import List from './list'
import Store from './store'
import { memoStyles } from './styles'
import { Ctx } from './types'

const RakuenSearch = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <>
        <Header title='小组搜索' hm={['rakuenSearch', 'RakuenSearch']} />
        <Page>
          <Flex style={styles.searchBar}>
            <Flex.Item>
              <SearchBar />
            </Flex.Item>
            <View style={_.ml.sm}>
              <Button
                style={styles.btn}
                type='ghostPlain'
                size='sm'
                onPress={$.doSearch}
              >
                查询
              </Button>
              <Heatmap id='帖子搜索.搜索' />
            </View>
          </Flex>
          <History style={_.mt.sm} />
          <List />
        </Page>
      </>
    )
  })
}

export default ic(Store, RakuenSearch)
