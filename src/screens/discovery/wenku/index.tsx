/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 12:44:43
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import Header from '../anime/header'
import { useWenkuPage } from './hooks'
import List from './list'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** 找文库 */
function Wenku(props: NavigationProps) {
  const { id, $ } = useWenkuPage(props)

  return (
    <Component id='screen-wenku'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <List $={$} />
        </Page>
        <Header title='找文库' alias='文库' hm={HM} />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Wenku)
