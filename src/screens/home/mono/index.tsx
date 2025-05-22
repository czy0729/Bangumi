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
import { NavigationProps } from '@types'
import List from './component/list'
import Header from './header'
import { useMonoPage } from './hooks'

/** 人物 */
const Mono = (props: NavigationProps) => {
  const { id, fixed, handleScroll } = useMonoPage(props)

  return useObserver(() => (
    <Component id='screen-mono'>
      <StoreContext.Provider value={id}>
        <Page statusBarEvent={false}>
          <List onScroll={handleScroll} />
          <Heatmap id='人物' screen='Mono' />
        </Page>
        <Header fixed={fixed} />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Mono
