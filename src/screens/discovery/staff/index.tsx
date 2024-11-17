/*
 * @Author: czy0729
 * @Date: 2021-04-15 19:50:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:05:43
 */
import React from 'react'
import { Component, Heatmap, Page } from '@components'
import { _, StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Header from './header'
import { useStaffPage } from './hooks'

/** 新番 */
const Staff = (props: NavigationProps) => {
  const { id } = useStaffPage(props)

  return useObserver(() => (
    <Component id='screen-staff'>
      <StoreContext.Provider value={id}>
        <Header />
        <Page>
          <List />
        </Page>
        <Heatmap bottom={_.bottom} id='新番' screen='Staff' />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Staff
