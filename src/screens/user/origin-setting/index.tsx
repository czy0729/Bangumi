/*
 * @Author: czy0729
 * @Date: 2022-03-22 16:58:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-05 16:41:39
 */
import React from 'react'
import { Component, Page, ScrollView } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import Cloud from './component/cloud'
import List from './component/list'
import Header from './header'
import Store from './store'
import { memoStyles } from './styles'
import { Ctx } from './types'

/** 自定义源头 */
const OriginSetting = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-origin-setting'>
      <Header />
      <Page loaded={$.state._loaded}>
        <ScrollView contentContainerStyle={memoStyles().scrollView}>
          <Cloud
            isLogin={$.isLogin}
            active={$.state.active}
            onToggle={$.onToggle}
            onDownloaded={$.init}
          />
          <List />
        </ScrollView>
      </Page>
    </Component>
  ))
}

export default ic(Store, OriginSetting)
