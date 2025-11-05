/*
 * @Author: czy0729
 * @Date: 2023-04-26 15:22:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-03 00:51:49
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Textarea from './component/textarea'
import Header from './header'
import { useDollarsPage } from './hooks'

/** Dollars */
const Dollars = (props: NavigationProps) => {
  const { id, $ } = useDollarsPage(props)

  return useObserver(() => (
    <Component id='screen-dollars'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.dollars._loaded}>
          <View style={_.container.header}>
            <Textarea />
            <List />
          </View>
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Dollars
