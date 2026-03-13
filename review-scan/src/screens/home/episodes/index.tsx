/*
 * @Author: czy0729
 * @Date: 2020-10-17 16:59:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 09:54:06
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Extra from './component/extra'
import List from './component/list'
import Header from './header'
import { useEpisodesPage } from './hooks'

/** 章节 */
const Episodes = (props: NavigationProps) => {
  const { id, $ } = useEpisodesPage(props)

  return useObserver(() => (
    <Component id='screen-episodes'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.subject._loaded}>
          <List />
        </Page>
        <Header />
        <Extra />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Episodes
