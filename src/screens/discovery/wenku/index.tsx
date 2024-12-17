/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:18:53
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Header from '../anime/header'
import { useWenkuPage } from './hooks'
import List from './list'
import { HM } from './ds'

/** 找文库 */
const Wenku = (props: NavigationProps) => {
  const { id, $ } = useWenkuPage(props)

  return useObserver(() => (
    <Component id='screen-wenku'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <List $={$} />
        </Page>
        <Header title='找文库' alias='文库' hm={HM} />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Wenku
