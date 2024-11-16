/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 11:19:08
 */
import React from 'react'
import { Component, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Header from '../anime/header'
import { useWenkuPage } from './hooks'
import List from './list'

/** 找文库 */
const Wenku = (props: NavigationProps) => {
  const { id, $ } = useWenkuPage(props)

  return useObserver(() => (
    <Component id='screen-wenku'>
      <StoreContext.Provider value={id}>
        <Header title='找文库' alias='文库' hm={['wenku', 'Wenku']} />
        <Page loaded={$.state._loaded}>
          <List $={$} />
        </Page>
      </StoreContext.Provider>
    </Component>
  ))
}

export default Wenku
