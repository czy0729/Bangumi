/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:46:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 16:11:37
 */
import React from 'react'
import { Component, Page } from '@components'
import { systemStore } from '@stores'
import { ic } from '@utils/decorators'
import { useObserver } from '@utils/hooks'
import Mesume from './component/mesume'
import Extra from './extra'
import { useDiscoveryPage } from './hooks'
import List from './list'
import Store from './store'
import { Ctx } from './types'

const Discovery = ({ isFocused }, context: Ctx) => {
  useDiscoveryPage(context)

  const { $ } = context
  return useObserver(() => {
    const { live2D } = systemStore.setting
    return (
      <Component id='screen-discovery'>
        <Page>
          <List isFocused={isFocused} />
          {live2D && <Mesume dragging={$.state.dragging} />}
        </Page>
        <Extra />
      </Component>
    )
  })
}

export default ic(Store, Discovery, {
  listenIsFocused: true
})
