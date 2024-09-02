/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 11:21:45
 */
import React from 'react'
import { Component, Page } from '@components'
import { systemStore } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import Extra from './component/extra'
import List from './component/list'
import Mesume from './component/mesume'
import { useDiscoveryPage } from './hooks'
import Store from './store'
import { Ctx } from './types'

/** 发现 */
const Discovery = (_props, context: Ctx) => {
  useDiscoveryPage(context)

  const { $ } = context
  return useObserver(() => (
    <Component id='screen-discovery'>
      <Page>
        <List />
        {systemStore.setting.live2D && <Mesume dragging={$.state.dragging} />}
      </Page>
      <Extra />
    </Component>
  ))
}

export default ic(Store, Discovery)
