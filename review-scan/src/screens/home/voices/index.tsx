/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:37:48
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import ToolBar from './component/tool-bar'
import Header from './header'
import { useVoicesPage } from './hooks'

/** 人物的角色 */
const Voices = (props: NavigationProps) => {
  const { id, $ } = useVoicesPage(props)

  return useObserver(() => (
    <Component id='screen-voices'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded} loading={!$.monoVoices._loaded}>
          <View style={_.container.header}>
            <ToolBar />
            <List />
          </View>
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Voices
