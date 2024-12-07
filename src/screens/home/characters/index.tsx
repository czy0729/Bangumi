/*
 * @Author: czy0729
 * @Date: 2020-05-21 16:36:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-04 20:18:51
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Extra from './component/extra'
import List from './component/list'
import Header from './header'
import { useCharactersPage } from './hooks'

/** 条目更多角色 */
const Characters = (props: NavigationProps) => {
  const { id, $ } = useCharactersPage(props)

  return useObserver(() => (
    <Component id='screen-characters'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.characters._loaded}>
          <List />
        </Page>
        <Header />
        <Extra />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Characters
