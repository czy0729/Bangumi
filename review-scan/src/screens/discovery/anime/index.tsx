/*
 * @Author: czy0729
 * @Date: 2020-07-15 11:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:16:32
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Header from './header'
import { useAnimePage } from './hooks'

/** 找番剧 */
const Anime = (props: NavigationProps) => {
  const { id, $ } = useAnimePage(props)

  return useObserver(() => (
    <Component id='screen-anime'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Anime
