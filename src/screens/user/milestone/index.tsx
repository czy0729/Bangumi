/*
 * @Author: czy0729
 * @Date: 2024-10-10 11:55:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-26 06:17:52
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import './styles'
import { Component, Page, Track } from '@components'
import { _ } from '@stores'
import { ic } from '@utils/decorators'
import { useRunAfter } from '@utils/hooks'
import Bg from './component/bg'
import List from './component/list'
import Options from './component/options'
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
          backgroundColor: _.colorPlain
        }}
      />
      <Page loaded={$.state._loaded}>
        <Bg />
        <List />
      </Page>
      <Options />
      <Track title='照片墙' hm={[`milestone/${$.userId}`, 'Milestone']} />
    </Component>
  ))
}

export default ic(Store, Milestone)
