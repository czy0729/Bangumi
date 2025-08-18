/*
 * @Author: czy0729
 * @Date: 2020-04-25 14:54:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:42:51
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import List from './component/list'
import Header from './header'
import { useWorksPage } from './hooks'

/** 人物的作品 */
const Works = (props: NavigationProps) => {
  const { id, $ } = useWorksPage(props)

  return useObserver(() => (
    <Component id='screen-works'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded} loading={!$.list._loaded}>
          <List />
        </Page>
        <Header />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Works
