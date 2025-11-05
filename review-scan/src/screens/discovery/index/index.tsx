/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-14 20:50:25
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext, systemStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Extra from './component/extra'
import List from './component/list'
import Mesume from './component/mesume'
import { useDiscoveryPage } from './hooks'

/** 发现 */
const Discovery = (props: NavigationProps) => {
  const { id, $ } = useDiscoveryPage(props)

  return useObserver(() => (
    <Component id='screen-discovery'>
      <StoreContext.Provider value={id}>
        <Page>
          <List />
          {systemStore.setting.live2D && <Mesume dragging={$.state.dragging} />}
        </Page>
        <Extra />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Discovery
