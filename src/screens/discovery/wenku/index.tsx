/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:23:36
 */
import React from 'react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import { useObserver } from '@utils/hooks'
import Header from '../anime/header'
import { useWenkuPage } from './hooks'
import List from './list'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** 找文库 */
const Wenku = (props: NavigationProps) => {
  const { id, $ } = useWenkuPage(props)

  return useObserver(() => (
    <Component id='screen-wenku'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <List $={$} />
        </Page>
        <Header title='找文库' alias='文库' hm={HM} />
      </StoreContext.Provider>
    </Component>
  ))
}

export default Wenku
