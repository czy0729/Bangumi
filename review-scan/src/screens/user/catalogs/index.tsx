/*
 * @Author: czy0729
 * @Date: 2020-03-22 18:45:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:37:56
 */
import React from 'react'
import { Component, Heatmap, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Tabs from './component/tabs'
import Header from './header'
import { useCatelogsPage } from './hooks'

/** 用户目录 */
const Catelogs = (props: NavigationProps) => {
  const { id, $ } = useCatelogsPage(props)

  return useObserver(() => (
    <Component id='screen-catelogs'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <Tabs />
        </Page>
        <Header />
        <Heatmap bottom={_.bottom} id='用户目录' screen='Catelogs' />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Catelogs
