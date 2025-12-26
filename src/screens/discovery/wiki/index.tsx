/*
 * @Author: czy0729
 * @Date: 2021-02-03 22:47:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-25 05:16:01
 */
import React from 'react'
import { View } from 'react-native'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Cate from './component/cate'
import Counts from './component/counts'
import List from './component/list'
import Header from './header'
import { useWikiPage } from './hooks'
import { styles } from './styles'

import type { NavigationProps } from '@types'

/** 维基人 */
const Wiki = (props: NavigationProps) => {
  const { id } = useWikiPage(props)

  return useObserver(() => (
    <Component id='screen-wiki'>
      <StoreContext.Provider value={id}>
        <Page>
          <HeaderPlaceholder />
          <Counts />
          <View style={styles.list}>
            <Cate />
            <List />
          </View>
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Wiki
