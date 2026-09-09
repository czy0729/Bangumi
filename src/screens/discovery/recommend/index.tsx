/*
 * @Author: czy0729
 * @Date: 2023-05-24 10:28:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 12:43:46
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Button, Component, Flex, HeaderPlaceholder, Page } from '@components'
import { IconTouchable } from '@_'
import { _, StoreContext } from '@stores'
import { WEB } from '@constants'
import Category from './component/category'
import List from './component/list'
import SearchBar from './component/search-bar'
import Header from './header'
import { useRecommendPage } from './hooks'
import { memoStyles } from './styles'

import type { NavigationProps } from '@types'

/** AI 推荐 */
function Recommend(props: NavigationProps) {
  const { id, $, navigation } = useRecommendPage(props)

  const styles = memoStyles()

  return (
    <Component id='screen-recommend'>
      <StoreContext.Provider value={id}>
        <Page>
          <HeaderPlaceholder />
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
}

export default observer(Recommend)
