/*
 * @Author: czy0729
 * @Date: 2022-04-15 09:17:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-02 17:33:07
 */
import React from 'react'
import { Component, Page } from '@components'
import { ic } from '@utils/decorators'
import { useObserver, useRunAfter } from '@utils/hooks'
import List from './component/list'
import Tips from './component/tips'
import ToolBar from './component/tool-bar'
import Header from './header'
import Store from './store'
import { Ctx } from './types'

/** 关联系列 */
const Series = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => (
    <Component id='screen-series'>
      <Header />
      <Page loaded={$.state._loaded}>
        {$.state.fixed && <ToolBar />}
        <List />
        <Tips />
      </Page>
    </Component>
  ))
}

export default ic(Store, Series)
