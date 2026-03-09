/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-09 09:26:07
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Extra from './component/extra'
import List from './component/list'
import Mesume from './component/mesume'
import { useDiscoveryPage } from './hooks'

import type { NavigationProps } from '@types'

/** 发现 */
const Discovery = (props: NavigationProps) => {
  const { id, loaded, handleForwardRef, handleMessage, handleTouchMove } = useDiscoveryPage(props)

  return useObserver(() => (
    <Component id='screen-discovery'>
      <StoreContext.Provider value={id}>
        <Page>
          <View onTouchMove={handleTouchMove}>
            <List />
          </View>
          <View pointerEvents={loaded ? 'auto' : 'none'}>
            <Mesume forwardRef={handleForwardRef} onMessage={handleMessage} />
          </View>
        </Page>
        <Extra />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Discovery
