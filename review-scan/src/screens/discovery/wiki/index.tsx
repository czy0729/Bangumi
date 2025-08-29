/*
 * @Author: czy0729
 * @Date: 2021-02-03 22:47:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:14:26
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Cate from './component/cate'
import Counts from './component/counts'
import List from './component/list'
import Header from './header'
import { useWikiPage } from './hooks'
import { styles } from './styles'

/** 维基人 */
const Wiki = (props: NavigationProps) => {
  const { id } = useWikiPage(props)

  return useObserver(() => (
    <Component id='screen-wiki'>
      <StoreContext.Provider value={id}>
        <Page style={_.container.header}>
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
