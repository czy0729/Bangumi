/*
 * @Author: czy0729
 * @Date: 2019-03-13 08:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-18 13:09:54
 */
import React from 'react'
import { Component } from '@components'
import { Auth } from '@_'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Extra from './component/extra'
import Modal from './component/modal'
import Page from './component/page'
import Tab from './component/tab'
import Tips from './component/tips'
import Header from './header'
import { useHomePage } from './hooks'

/** 进度 */
const Home = (props: NavigationProps) => {
  const { id, $ } = useHomePage(props)

  return useObserver(() => (
    <Component id='screen-home'>
      <StoreContext.Provider value={id}>
        <Page>
          {$.isLogin ? (
            <>
              <Header />
              <Tab keys={$.tabs.map(item => item.key)} />
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
  ))
}

export default Home
