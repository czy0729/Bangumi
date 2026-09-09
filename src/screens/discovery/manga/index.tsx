/*
 * @Author: czy0729
 * @Date: 2021-01-09 00:57:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 12:43:32
 */
import { observer } from 'mobx-react'
import { Component, HeaderPlaceholder, Page } from '@components'
import { StoreContext } from '@stores'
import Header from '../anime/header'
import List from './component/list'
import { useMangaPage } from './hooks'
import { HM } from './ds'

import type { NavigationProps } from '@types'

/** 找漫画 */
function Manga(props: NavigationProps) {
  const { id, $ } = useMangaPage(props)

  return (
    <Component id='screen-manga'>
      <StoreContext.Provider value={id}>
        <Page loaded={$.state._loaded}>
          <HeaderPlaceholder />
          <List $={$} />
        </Page>
        <Header title='找漫画' alias='Manga' hm={HM} />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(Manga)
