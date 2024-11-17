/*
 * @Author: czy0729
 * @Date: 2023-04-26 15:22:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:36:03
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Textarea from './component/textarea'
import Header from './header'
import { useDollarsPage } from './hooks'

/** Dollars */
const Dollars = (props: NavigationProps) => {
  const { id, $ } = useDollarsPage(props)

  return useObserver(() => (
    <Component id='screen-dollars'>
      <StoreContext.Provider value={id}>
        <Header />
        <Page loaded={$.dollars._loaded}>
          <Textarea />
          <List />
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default Dollars
