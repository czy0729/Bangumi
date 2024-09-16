/*
 * @Author: czy0729
 * @Date: 2023-05-24 10:28:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 20:25:21
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Component, Flex, Page } from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import { WEB } from '@constants'
import Category from './component/category'
import List from './component/list'
import SearchBar from './component/search-bar'
import Header from './header'
import Store from './store'
import { memoStyles } from './styles'
import { Ctx } from './types'

/** AI 推荐 */
const Recommend = (props, { $, navigation }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='screen-recommend'>
        <Header />
        <Page>
          <Flex style={styles.searchBar}>
            <Category />
            <Flex.Item>
              <SearchBar />
            </Flex.Item>
            <Button style={styles.btn} type='ghostPlain' size='sm' onPress={$.doSearchV2}>
              查询
            </Button>
          </Flex>
          <List />
        </Page>
        {WEB && (
          <View style={styles.home}>
            <IconTouchable
              name='home'
              size={17}
              color={_.colorSub}
              onPress={() => navigation.push('Discovery')}
            />
          </View>
        )}
      </Component>
    )
  })
}

export default ic(Store, Recommend)
