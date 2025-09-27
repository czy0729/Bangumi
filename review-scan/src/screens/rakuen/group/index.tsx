/*
 * @Author: czy0729
 * @Date: 2019-07-13 18:46:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-08 10:54:39
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Page, ScrollView } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Extra from './component/extra'
import Info from './component/info'
import List from './component/list'
import Pagination from './component/pagination'
import Header from './header'
import { useGroupPage } from './hooks'
import { styles } from './styles'

/** 小组 */
const Group = (props: NavigationProps) => {
  const { id, $, fixed, handleScroll } = useGroupPage(props)

  return useObserver(() => (
    <Component id='screen-rakuen-group'>
      <StoreContext.Provider value={id}>
        <Page statusBarEvent={false}>
          <ScrollView scrollEventThrottle={16} scrollToTop onScroll={handleScroll}>
            <Info />
            {$.state.show && (
              <View style={styles.list}>
                <List />
              </View>
            )}
          </ScrollView>
          <Pagination />
        </Page>
        <Header fixed={fixed} />
        <Extra />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Group
