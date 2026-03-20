/*
 * @Author: czy0729
 * @Date: 2019-03-13 08:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 06:54:21
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { Auth } from '@_'
import { StoreContext } from '@stores'
import Extra from './component/extra'
import Modal from './component/modal'
import Page from './component/page'
import Tab from './component/tab'
import Tips from './component/tips'
import Header from './header'
import { useHomePage } from './hooks'

import type { NavigationProps } from '@types'

/** 进度 */
function Home(props: NavigationProps) {
  const { id, $ } = useHomePage(props)

  return (
    <Component id='screen-home'>
      <StoreContext.Provider value={id}>
        <Page>
          {$.isLogin ? (
            <>
              <Tab keys={$.tabs.map(item => item.key)} />
              <Header />
              <Tips />
              <Modal />
            </>
          ) : (
            <Auth />
          )}
        </Page>
        <Extra />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Home)
