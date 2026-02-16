/*
 * @Author: czy0729
 * @Date: 2019-04-26 13:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 03:18:59
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Extra from './component/extra'
import Tab from './component/tab'
import Header from './header'
import { useRakuenPage } from './hooks'

/** 超展开 */
const Rakuen = (props: NavigationProps) => {
  const { id } = useRakuenPage(props)

  return useObserver(() => (
    <Component id='screen-rakuen'>
      <StoreContext.Provider value={id}>
        <Page>
          <Header />
          <Tab />
        </Page>
        <Extra />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Rakuen
