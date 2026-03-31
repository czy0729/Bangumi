/*
 * @Author: czy0729
 * @Date: 2019-07-13 18:46:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-01 06:37:25
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component, Page, ScrollView } from '@components'
import { StoreContext } from '@stores'
import Extra from './component/extra'
import Info from './component/info'
import List from './component/list'
import Pagination from './component/pagination'
import Header from './header'
import { useGroupPage } from './hooks'
import { styles } from './styles'

import type { NavigationProps } from '@types'

/** 小组 */
function Group(props: NavigationProps) {
  const { id, $, fixed, handleScroll } = useGroupPage(props)

  return (
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
  )
}

export default observer(Group)
