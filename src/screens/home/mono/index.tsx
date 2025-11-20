/*
 * @Author: czy0729
 * @Date: 2019-05-11 04:19:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 10:01:50
 */
import React from 'react'
import { Component, Heatmap, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import List from './component/list'
import Header from './header'
import { useMonoPage } from './hooks'

import type { NavigationProps } from '@types'

/** 人物 */
const Mono = (props: NavigationProps) => {
  const { id } = useMonoPage(props)

  return useObserver(() => (
    <Component id='screen-mono'>
      <StoreContext.Provider value={id}>
        <Page statusBarEvent={false}>
          <List />
          <Heatmap id='人物' screen='Mono' />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Mono
