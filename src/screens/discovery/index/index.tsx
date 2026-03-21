/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 20:30:02
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import Extra from './component/extra'
import List from './component/list'
import Mesume from './component/mesume'
import { useDiscoveryPage } from './hooks'

import type { NavigationProps } from '@types'

/** 发现 */
function Discovery(props: NavigationProps) {
  const { id, loaded, handleForwardRef, handleMessage, handleTouchMove } = useDiscoveryPage(props)

  return (
    <Component id='screen-discovery'>
      <StoreContext.Provider value={id}>
        <Page>
          <View onTouchMove={handleTouchMove}>
            <List />
          </View>
          <Mesume forwardRef={handleForwardRef} loaded={loaded} onMessage={handleMessage} />
        </Page>
        <Extra />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Discovery)
