/*
 * @Author: czy0729
 * @Date: 2024-11-07 11:57:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-08 06:33:24
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Component, Page, ScrollView } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter } from '@utils/hooks'
import Info from './component/info'
import Summary from './component/summary'
import Type from './component/type'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 条目详情 */
const SubjectInfo = (_props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-info'>
      <Header />
      <Page loaded={$.state._loaded}>
        <Type />
        <ScrollView>{$.state.type === '简介' ? <Summary /> : <Info />}</ScrollView>
      </Page>
    </Component>
  ))
}

export default ic(Store, SubjectInfo)
