/*
 * @Author: czy0729
 * @Date: 2023-05-24 10:28:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:51:10
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Component, Flex, Page } from '@components'
import { IconTouchable } from '@_'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { WEB } from '@constants'
import { NavigationProps } from '@types'
import Category from './component/category'
import List from './component/list'
import SearchBar from './component/search-bar'
import Header from './header'
import { useRecommendPage } from './hooks'
import { memoStyles } from './styles'

/** AI 推荐 */
const Recommend = (props: NavigationProps) => {
  const { id, $, navigation } = useRecommendPage(props)

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='screen-recommend'>
        <StoreContext.Provider value={id}>
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
          <Header />
        </StoreContext.Provider>
      </Component>
    )
  })
}

export default Recommend
