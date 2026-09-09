/*
 * @Author: czy0729
 * @Date: 2020-03-22 18:45:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-26 21:39:25
 */
import { observer } from 'mobx-react'
import { Component, Heatmap, Page } from '@components'
import { _, StoreContext } from '@stores'
import Tabs from './component/tabs'
import Header from './header'
import { useCatelogsPage } from './hooks'

import type { NavigationProps } from '@types'

/** 用户目录 */
function Catelogs(props: NavigationProps) {
  const { id, $ } = useCatelogsPage(props)

  return (
    <Component id='screen-catelogs'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <Tabs />
        </Page>
        <Header />
        <Heatmap bottom={_.bottom} id='用户目录' screen='Catelogs' />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Catelogs)
