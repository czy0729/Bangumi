/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:55:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-12 01:16:21
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Component, Page } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter } from '@utils/hooks'
import List from './component/list'
import Store from './store'
import { Ctx } from './types'

/** 照片墙 */
const Milestone = (_props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-milestone'>
      <View
        style={{
          height: _.statusBarHeight,
          backgroundColor: 'rgba(0, 0, 0, 0)'
        }}
      />
      <Page>
        <List />
      </Page>
    </Component>
  ))
}

export default ic(Store, Milestone)
